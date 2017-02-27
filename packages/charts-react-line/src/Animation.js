import React from 'react';

export default function Animation(props) {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes dashoffset {
        to { stroke-dashoffset: 0; }
      }
    `}}
    />
  );
}
