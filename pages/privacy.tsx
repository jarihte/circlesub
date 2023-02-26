import React from 'react';
import ReactMarkdown from 'react-markdown';
import privacy from '../markdown/privacy';

export default function External() {
  return (
    <div className="mb-5" data-testid="external">
      <div data-testid="external-text">
        <p className="lead">
          <ReactMarkdown>
            {privacy}
          </ReactMarkdown>
        </p>
      </div>
    </div>
  );
}
