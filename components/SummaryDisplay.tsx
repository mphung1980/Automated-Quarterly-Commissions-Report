
import React from 'react';

// A simple markdown-to-html converter
const markdownToHtml = (text: string) => {
  let html = text
    // Headings
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-800 mb-4 mt-6">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-700 mb-3 mt-4">$1</h3>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Code blocks
    .replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-indigo-700 font-mono py-1 px-2 rounded-md text-sm">$1</code>')
    // Lists
    .replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2">$1</li>')
    .replace(/<li>/g, '<ul><li>')
    .replace(/<\/li>\n(?!<li>)/g, '</li></ul>');

  return html.split('\n').map(line => line.trim() ? line : '<br />').join('');
};


interface SummaryDisplayProps {
  summary: string;
  isLoading: boolean;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, isLoading }) => {
  if (isLoading) {
    return (
        <div className="mt-8 max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-8"></div>

            <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4 mt-8"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-3"></div>
        </div>
    );
  }

  if (!summary) {
    return null;
  }
  
  const formattedSummary = markdownToHtml(summary);

  return (
    <div className="mt-10 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 prose">
      <div dangerouslySetInnerHTML={{ __html: formattedSummary }} />
    </div>
  );
};

export default SummaryDisplay;
