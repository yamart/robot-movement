import * as React from "react"; 
import * as ReactDOM from "react-dom"; 
import {Robot} from "./robot.js"

interface AppState {
    robotPosition;
}

class App extends React.Component<any,AppState> {
    boardEl: HTMLElement;

    constructor(props:any) {
        super(props);

        this.state = {
            robotPosition: null
        }

        this.onCellClick = this.onCellClick.bind(this);
        this.onControlBtnClick = this.onControlBtnClick.bind(this);
    }

    componentDidMount() {
        this.boardEl = this.refs["board"] as HTMLElement;

        Robot.PLACE(0,0,"SOUTH");

        this.setState({
            robotPosition: Robot.REPORT()
        });

        window.addEventListener("keyup", (e) => {
            switch(e.keyCode) {
                case 37:
                    this.updatePosition(Robot.LEFT);
                break;

                case 39:
                    this.updatePosition(Robot.RIGHT);
                break;

                case 38:
                    this.updatePosition(Robot.MOVE);
                break;

                case 40:
                    this.updatePosition(Robot.MOVE.bind(null, true));
                break;                
            }
        });        
    }

    onCellClick(e) {
        let el = e.target as HTMLElement,
            X = parseInt(el.getAttribute("data-row")),
            Y = parseInt(el.getAttribute("data-cell"));

        Robot.PLACE(X,Y, null);

        this.setState({
            robotPosition: Robot.REPORT()
        });         
    }

    onControlBtnClick(e) {
        let el = e.target as HTMLElement,
            action = el.getAttribute("data-action");

        switch(action) {
            case "left":
                this.updatePosition(Robot.LEFT);
            break;

            case "right":
                this.updatePosition(Robot.RIGHT);
            break;

            case "forward":
                this.updatePosition(Robot.MOVE);
            break;

            case "backward":
                this.updatePosition(Robot.MOVE.bind(null, true));
            break;                
        }         
    }

    updatePosition(action) {
        try {
            action();
            this.setState({
                robotPosition: Robot.REPORT()
            });        
        } catch(e) {
            this.boardEl.setAttribute("data-denied", "true");

            setTimeout(() => {
                this.boardEl.setAttribute("data-denied","");
            }, 200);

            console.log(e.message);
        }
    }

    renderBoard() {
        let board = Robot.board,
            cellWidth = 100/board[0] + "%",
            cells = [],
            cp = this.state.robotPosition;
        
        for(let r = 0; r < board[1]; r++) {
            for(let d = 0; d < board[0]; d++) {
                cells.push(<div className="cell" 
                                key={r+"-"+d} 
                                data-active={ cp && cp.Y == r && cp.X == d } 
                                data-row={d}
                                data-cell={r}
                                style={{ width: cellWidth }}
                                onClick={ this.onCellClick }></div>);
            }       
        }

        return cells.map(c => c);
    }

    renderControls() {
        return (
            <div className="board-controls">
                <div className="bc-btn" onClick={this.onControlBtnClick} data-action="left" title="Rotate Left"><i className="fa fa-undo" aria-hidden="true"></i></div>
                <div className="bc-btn" onClick={this.onControlBtnClick} data-action="forward" title="Move Forward"><i className="fa fa-arrow-up" aria-hidden="true"></i></div>
                <div className="bc-btn" onClick={this.onControlBtnClick} data-action="backward" title="Move Backward"><i className="fa fa-arrow-down" aria-hidden="true"></i></div>
                <div className="bc-btn" onClick={this.onControlBtnClick} data-action="right" title="Rotate Right"><i className="fa fa-repeat" aria-hidden="true"></i></div>
            </div>
        )
    }

    render() {
        let board = Robot.board,
            cp = this.state.robotPosition;

        return (
            <div className="app-component">
                <h1><b>Robot</b> Movement</h1>
                <p>Use the controls bellow or keyboard arrows to move, or jump to cell by clicking it</p>
                <div ref="board" className="board" data-facing={cp && cp.F}>
                    { this.renderBoard() }
                    { this.renderControls() }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />,document.getElementById("container"));