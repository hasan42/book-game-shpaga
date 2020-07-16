import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import gameStore from "../../stores/gameStore";
import Card from "../../ui/Card/Card";

// class IntroPage extends Component {
// const IntroPage = observer(props => (
//       <div className="intro">
//         <h1>IntroPage</h1>
//         <button onClick={() => props.openIntro()}>Open Intro</button>
//         <button onClick={() => props.closeIntro()}>Close Intro</button>

//         {props.isShowIntro &&(
//           <div >
//           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore doloribus quis veniam, ad soluta, nisi quidem aliquam cum facilis porro tempore dolores at veritatis. Eius recusandae odio quisquam ex eos! ipsum</p>
//           </div>
//         )}

//       </div>
//     ));

const IntroPage = inject("gameStore")(
  observer(({ GameStore }) => {
    return (
      <div>
        <Card />
        <button onClick={() => gameStore.openIntro()}>Open Intro</button>
        <button onClick={() => gameStore.closeIntro()}>Close Intro</button>
        <hr />
        <div>{() => gameStore.showIntroText()}</div>
        <div>{gameStore.introText}</div>
      </div>
    );
  })
);

export default IntroPage;
