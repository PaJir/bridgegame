import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import Service from "../Service";

const service = new Service();

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: [
                { type: "S", number: "0" },
                { type: "C", number: "A" },
                { type: "D", number: "9" },
                { type: "H", number: "K" }
            ],
            player2: "hello",
            player3: "hello",
            player4: "hello"
        };
        this.enterRoom = this.enterRoom.bind(this);
        this.start = this.start.bind(this);
        // 发送心跳包
        this.interval = null;
    }

    componentDidCatch() {
        this.interval = setInterval(() => this.heart(), 1000);
    }

    componentWillUnmount() {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
    }

    // 转换卡牌花色
    typeShow(type) {
        var t;
        switch (type) {
            case "S":
                t = "♠";
                break;
            case "C":
                t = "♣";
                break;
            case "D":
                t = "♦";
                break;
            case "H":
                t = "♥";
                break;
            default:
                t = " ";
                break;
        }
        return t;
    }

    // 转换卡牌数字
    numberShow(number) {
        var n;
        switch (number) {
            case "0":
                n = "10";
                break;
            default:
                n = number;
                break;
        }
        return n;
    }

    // 渲染一张卡牌
    renderOneCard(values) {
        return values.map((value, index) => {
            return (
                <div className="card" key={index}>
                    <b
                        style={{
                            color:
                                value.type === "D" || value.type === "H"
                                    ? "#FF0000"
                                    : "000000"
                        }}
                    >
                        {this.typeShow(value.type)}
                    </b>
                    <div className="number">
                        {this.numberShow(value.number)}
                    </div>
                </div>
            );
        });
    }

    enterRoom() {
        service.enterRoom();
    }

    start() {
        service.start().then((response) => {
            console.log(response);
            response.data.start
                ? console.log("准备成功")
                : console.log("准备失败");
        });
    }

    // 心跳包
    heart() {
        service.heart().then((response) => {
            console.log("heart: ", response);
        });
    }

    render() {
        return (
            <div className="App">
                <div id="container">
                    <div id="player3">{this.state.player3}</div>
                    <div className="center">
                        <div id="player4">{this.state.player4}</div>
                        <div id="player2">{this.state.player2}</div>
                    </div>
                    <div id="footer">
                        <input
                            id="deal"
                            type="button"
                            value="叫牌"
                            onClick={() => {
                                console.log("out");
                            }}
                        />
                        <input
                            id="deal"
                            type="button"
                            value="出牌"
                            onClick={() => {
                                console.log("out");
                            }}
                        />
                    </div>
                    <div id="player1">
                        {this.renderOneCard(this.state.player1)}
                    </div>
                </div>
                <div id="footer">
                    <input
                        id="create"
                        type="button"
                        value="进入房间（目前只有唯一一个房间）"
                        onClick={this.enterRoom}
                    />
                    <input
                        id="sort"
                        type="button"
                        value="准备"
                        onClick={this.start}
                    />
                </div>
                <div id="compeleteCards"></div>
            </div>
        );
    }
}

export default withRouter(Main);
