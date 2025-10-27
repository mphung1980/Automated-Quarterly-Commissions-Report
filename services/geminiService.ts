
import { GoogleGenAI } from "@google/genai";
import { Filter, Schedule, ScheduleFrequency } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formatSchedule = (schedule: Schedule): string => {
    if (schedule.frequency === ScheduleFrequency.NOT_SCHEDULED) {
        return "This workflow is not scheduled and must be run manually.";
    }

    let scheduleString = `This workflow is scheduled to run **${schedule.frequency}** at **${schedule.time} UTC**`;

    if (schedule.frequency === ScheduleFrequency.WEEKLY && schedule.dayOfWeek !== undefined) {
        scheduleString += ` on **${WEEKDAYS[schedule.dayOfWeek]}s**`;
    } else if (schedule.frequency === ScheduleFrequency.MONTHLY) {
        scheduleString += ` on day **${schedule.dayOfMonth}** of the month`;
    }

    return scheduleString + ".";
}

export const generateWorkflowSummary = async (
  domoCardId: string,
  filters: Filter[],
  googleSheetUrl: string,
  schedule: Schedule
): Promise<string> => {
  const filterDescriptions = filters
    .map(f => `- **${f.column}** ${f.operator} \`${f.value}\``)
    .join('\n');

  const scheduleDescription = formatSchedule(schedule);

  const prompt = `
    You are a data workflow automation expert. Based on the following configuration, generate a concise, human-readable summary of the data pipeline steps. The output should be in markdown format with clear headings.

    ## Workflow Configuration

    *   **Source:** Domo Card ID \`${domoCardId}\`
    *   **Destination:** Google Sheet \`${googleSheetUrl}\`

    ### Transformation Logic
    The data from the Domo Card will be filtered based on the following criteria before export:
    ${filterDescriptions}

    ### Scheduling
    ${scheduleDescription}

    ## Workflow Summary

    Generate a brief, professional summary of this process. Explain what the workflow achieves in 2-3 sentences and include the schedule information.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
