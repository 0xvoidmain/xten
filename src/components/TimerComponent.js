import React from 'react';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

class TimerComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }
}

reactMixin(TimerComponent.prototype, TimerMixin);

export default TimerComponent;