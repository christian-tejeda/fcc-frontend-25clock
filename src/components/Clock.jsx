import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timer: 0,
            isTimerRunning: false,
            timerType: 'Session'
        }
        this.timerIntervalID = 0;
        this.beepAudio = document.getElementById("beep");
        this.handleBreakDecrease = this.handleBreakDecrease.bind(this);
        this.handleBreakIncrease = this.handleBreakIncrease.bind(this);
        this.handleSessionDecrease = this.handleSessionDecrease.bind(this);
        this.handleSessionIncrease = this.handleSessionIncrease.bind(this);
        this.updateTimerLength = this.updateTimerLength.bind(this);
        this.handleStartPauseTimer = this.handleStartPauseTimer.bind(this);
        this.tickTimer = this.tickTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    componentDidMount() {
        this.updateTimerLength(this.state.sessionLength);
    }

    componentDidUpdate() {
        //console.log("componentDidUpdate: ", this.state.sessionLength);
    }

    updateTimerLength(length) {
        this.setState((state) => {
            // let dateNow = new Date();
            // let dateDiff = new Date();
            // dateDiff.setMinutes(dateNow.getMinutes() + length);
            // dateDiff.setSeconds(dateNow.getSeconds());
            //console.log("updateSessionLength: ", state.sessionLength);
            return { timer: length * 1000 * 60 }
        });
    }

    handleBreakDecrease(event) {
        event.preventDefault();
        this.setState((state) => {
            if (state.breakLength > 1 && !state.isTimerRunning) {
                return { breakLength: state.breakLength - 1 };
            }
        })
    }

    handleBreakIncrease(event) {
        event.preventDefault();
        this.setState((state) => {
            if (state.breakLength < 60 && !state.isTimerRunning) {
                return { breakLength: state.breakLength + 1 };
            }
        })
    }

    handleSessionDecrease(event) {
        event.preventDefault();
        this.setState((state) => {
            if (state.sessionLength > 1 && !state.isTimerRunning) {
                //this.updateTimerLength(state.sessionLength - 1);
                return {
                    sessionLength: state.sessionLength - 1,
                    timer: state.timer - 1000 * 60
                }
            }
        });

    }

    handleSessionIncrease(event) {
        event.preventDefault();
        this.setState((state) => {
            if (state.sessionLength < 60 && !state.isTimerRunning) {
                //this.updateTimerLength(state.sessionLength + 1);
                return {
                    sessionLength: state.sessionLength + 1,
                    timer: state.timer + 1000 * 60
                }
            }
        });
    }

    formatTimer() {
        let options = {
            minute: 'numeric',
            second: 'numeric'
        }
        let formattedTime = new Intl.DateTimeFormat('default', options).format(new Date(this.state.timer));
        return formattedTime;
    }

    tickTimer() {
        this.setState((state) => {
            if (state.timer === 0) {
                this.beepAudio.play();
                if (state.timerType === 'Session') {
                    return {
                        timerType: 'Break',
                        timer: state.breakLength * 1000 * 60
                    }
                } else if (state.timerType === 'Break') {
                    return {
                        timerType: 'Session',
                        timer: state.sessionLength * 1000 * 60
                    }
                }
            }
            return {
                timer: state.timer - 1000
            }
        })

    }

    startTimer() {
        this.timerIntervalId = setInterval(this.tickTimer, 1000);
        this.setState({
            isTimerRunning: true
        })
        console.log("Timer running...");
    }

    pauseTimer() {
        this.timerIntervalId = clearInterval(this.timerIntervalId);
        this.setState({
            isTimerRunning: false
        })
        console.log("Timer paused...");
    }

    handleStartPauseTimer() {
        let btn = document.getElementById("start_stop").children[0];
        if (this.state.isTimerRunning) {
            this.pauseTimer();
            btn.classList.remove("bi-pause");
            btn.classList.add("bi-play");
        } else {
            this.startTimer();
            btn.classList.remove("bi-play");
            btn.classList.add("bi-pause");
        }
    }

    resetTimer(event) {
        event.preventDefault();
        this.setState((state) => {
            this.updateTimerLength(25);
            return {
                breakLength: 5,
                sessionLength: 25,
                isTimerRunning: false,
                timerType: 'Session'
            };
        })
        this.timerIntervalId = clearInterval(this.timerIntervalId);
        let btn = document.getElementById("start_stop").children[0];
        btn.classList.remove("bi-pause");
        btn.classList.add("bi-play");
        this.beepAudio.pause();
        this.beepAudio.currentTime = 0;

    }

    render() {
        return (
            <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-2 border p-2 m-2">
                        <div className="text-center">
                            <p id="timer-label">{this.state.timerType}</p>
                            <p id="time-left">
                                {this.formatTimer()}
                            </p>
                            <button className="btn btn-primary m-1" id="start_stop" onClick={this.handleStartPauseTimer}>
                                <i className="bi bi-play"></i>
                            </button>
                            {/* <button className="btn btn-primary m-1">
                                <i className="bi bi-pause"></i>
                            </button> */}
                            <button className="btn btn-primary m-1" id="reset" onClick={this.resetTimer}>
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                        </div>

                    </div>
                    <div className="col-2 border p-2 m-4">
                        <div className="text-center">
                            <p id="session-label">Session Length</p>
                            <p id="session-length">{this.state.sessionLength}</p>
                            <button className="btn btn-primary m-1" id="session-increment" onClick={this.handleSessionIncrease}>
                                <i className="bi bi-plus"></i>
                            </button>
                            <button className="btn btn-primary m-1" id="session-decrement" onClick={this.handleSessionDecrease}>
                                <i className="bi bi-dash"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-2 border p-2 m-4">
                        <div className="text-center">
                            <p id="break-label">Break Length</p>
                            <p id="break-length">{this.state.breakLength}</p>
                            <button className="btn btn-primary m-1" id="break-increment" onClick={this.handleBreakIncrease}>
                                <i className="bi bi-plus"></i>
                            </button>
                            <button className="btn btn-primary m-1" id="break-decrement" onClick={this.handleBreakDecrease}>
                                <i className="bi bi-dash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}