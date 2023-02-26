import React from 'react';
import ReactMarkdown from 'react-markdown';
import terms from '../markdown/terms';

export default function External() {
  return (
    <div className="mb-5" data-testid="external">
      <div data-testid="external-text">
        <p className="lead">
          <ReactMarkdown>
            {terms}
          </ReactMarkdown>
        </p>
      </div>
    </div>
  );
}
