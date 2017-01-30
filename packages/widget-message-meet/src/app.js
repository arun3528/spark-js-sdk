import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root';

import './styles/main.css';

export function initMessageMeetWidget(element, config) {
  ReactDOM.render(
    <Root accessToken={config.accessToken} toPersonEmail={config.toPersonEmail} toPersonId={config.toPersonId} />,
    element
  );

  return element;
}

function loadAllWidgets() {
  const widgets = document.querySelectorAll(`[data-toggle="spark-message-meet"]`);
  for (const widget of widgets) {
    initMessageMeetWidget(widget, {
      accessToken: widget.getAttribute(`data-access-token`) || undefined,
      toPersonEmail: widget.getAttribute(`data-to-person-email`) || undefined,
      toPersonId: widget.getAttribute(`data-to-person-id`) || undefined
    });
  }
}

document.addEventListener(`DOMContentLoaded`, loadAllWidgets, false);

if (module.hot) {
  module.hot.accept();
}

export default loadAllWidgets;
