/* global FB */
import React from "react";

import { useStateLink } from "@hookstate/core";

import { Modal, Row, ProgressBar, FacebookButton } from "components";
import { Participant } from "types";
import { FormatUtils } from "utils";
import { ParticipantState } from "states";

import "./MyPurchasesModal.scss";

type MyPurchasesModalProps = {
  emissionPerPerson: number;
  [rest: string]: any;
};

let progress = 0;
const MyPurchasesModal = ({ emissionPerPerson, ...rest }: MyPurchasesModalProps) => {
  const progressBarDuration = 2500;

  const co2PerItem = 10;
  const participant: Participant = useStateLink(ParticipantState).get();

  if (participant.co2Offset) {
    progress = (participant.co2Offset) / emissionPerPerson;
  }

  const shareOnFacebook = () => {
    FB.ui({
      method: 'share',
      href: 'https://jofnumokkur.xyz',
      quote: 'Ég er búinn að standa mig vel í kolefnisjöfnun, hvað með þig?'
    }, (response) => {

    })
  }

  
  const treeCount = co2PerItem * participant.co2Offset;
  var treeAnimationStep = progressBarDuration/treeCount;
  var treeAnimationStatus = 0;

  const createNudgeTreeStyle = () => {
    var randomMargin = () => Math.random() * 10 - 8;
    var randomMaxSize = () => Math.random() * 8 + 15;
    var incrementAnimationStep = () => {

      return treeAnimationStatus += treeAnimationStep;
    }

    return {
      marginLeft: randomMargin() + "px",
      marginTop: randomMargin() + "px",
      maxWidth: randomMaxSize() + "px",
      animationDelay: incrementAnimationStep() + "ms"
    }
  }


  var trees = [];
  for (var i = 0; i < Math.min(treeCount, 1000); i++)
    trees.push(<img src='/assets/tree.png' key = {i} style={createNudgeTreeStyle()} alt="Tré" className="tree-image" />);
  const progressBarFillColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--green')

  const progressBarTrailColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--progress-bar-trail')
  var percentage = FormatUtils.round(progress * 100, 2);
  return (
    <Modal
      className="my-purchases-modal-component"
      header="Skógurinn minn"
      size="xl"
      {...rest}
    >
      <Row>
        <div className="progress-container">
          <h2 className="participant_title">{participant.title}</h2>
          <p>{participant.co2Offset > 10 ? "Vel gert! " : ""} Þú ert búin/n að kolefnisjafna á við {FormatUtils.thousandSeparator(Math.round(treeCount))} tré {participant.co2Offset > 0 ?  " sem nemur " + percentage + "% af kolefnislosun meðal Íslendingsins" : ""}</p>
          {participant.co2Offset > 0 ?
            <ProgressBar.Line
              options={{
                strokeWidth: 4,
                color: progressBarFillColor,
                trailColor: progressBarTrailColor,
                duration: progressBarDuration,

              }}
              progress={Math.min(progress, 1)}
              text={percentage+ "%"}
              initialAnimate={true}
            /> : null}
          {participant.co2Offset === 0 ? <p className = "click_on_frontpage_text">Smelltu á Jafnaðu þig á forsíðunni til að byrja að kolefnisjafna strax í dag!</p> : ""}
        </div>
      </Row>

      <Row>
        <div className="tree-container">
          {
            trees
          }

        </div>

      </Row>
      <div className='share-options'>
        <FacebookButton text='Deila á Facebook' onClick={() => shareOnFacebook()} />
      </div>
      <div className="icons_whodunnit">Icons made by <a href="https://www.flaticon.com/free-icon/tree_740938?term=tree&page=2&position=82" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </Modal>
  );
};

export default MyPurchasesModal;
