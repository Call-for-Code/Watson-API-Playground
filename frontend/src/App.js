import React, { useState } from "react";
import {
  MDBInput,
  MDBTextArea,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";

import "./App.css";

import CallforCodeLogo from "./Call_for_Code_Logo.svg";
import WatsonLanguageTranslatorLogo from "./WatsonLanguageTranslator.svg";

const App = () => {
  const [startAbbrInput, setStartAbbrInput] = useState("");
  const [targetAbbrInput, setTargetAbbrInput] = useState("");
  const [translateTextInput, setTranslateTextInput] = useState("");
  const [translatedTextInput, setTranslatedTextInput] = useState("");
  const [allowTranslation, setAllowTranslation] = useState(false);

  const performTranslation = async (start, target, text) => {
    const response = await fetch("/v1/cfc/language-translator", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        startAbbreviation: start || "en",
        targetAbbreviation: target || "es",
        text: [text],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setTranslatedTextInput(data.translations[0].translation);
    } else {
      console.error(response.message);
    }
  };

  const translationTextInputHandler = (e) => {
    const val = e.target.value;
    if (val.length > 0) {
      setAllowTranslation(true);
    }
    setTranslateTextInput(val);
  };

  const submitHandler = (e) => {
    setAllowTranslation(false);
    e.preventDefault();
    performTranslation(startAbbrInput, targetAbbrInput, translateTextInput);
    setAllowTranslation(true);
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol size="md"></MDBCol>
        <MDBCol size="md">
          <MDBCard alignment="center" className="mt-3">
            <div className="text-center">
              <MDBCardImage
                src={WatsonLanguageTranslatorLogo}
                position="top"
                alt="..."
                className="w-50"
              />
            </div>
            <form onSubmit={submitHandler}>
              <MDBCardBody>
                <MDBCardTitle>
                  <MDBTypography tag="h3" className="mb-0">
                    Watson&nbsp;
                    <MDBTypography tag="small" className="text-muted">
                      Language Translator
                    </MDBTypography>
                  </MDBTypography>
                </MDBCardTitle>
                <MDBTypography note noteColor="secondary">
                  <a
                    href="https://cloud.ibm.com/docs/language-translator?topic=language-translator-translation-models"
                    className="text-center"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Supported Languages
                  </a>
                </MDBTypography>
                <div className="mb-4">
                  <MDBInput
                    id="startAbbr"
                    //wrapperClass="mb-4"
                    label="Starting Language Abbreviation"
                    value={startAbbrInput}
                    onChange={(e) => setStartAbbrInput(e.target.value)}
                    aria-describedby="startAbbrNotes"
                  />
                  <div id="startAbbrNotes" className="form-text text-start">
                    Defaults to "en" (English).
                  </div>
                </div>
                <div className="mb-4">
                  <MDBInput
                    id="targetAbbr"
                    label="Target Language Abbreviation"
                    value={targetAbbrInput}
                    onChange={(e) => setTargetAbbrInput(e.target.value)}
                    aria-describedby="targetAbbrNotes"
                  />
                  <div id="targetAbbrNotes" className="form-text text-start">
                    Defaults to "es" (Spanish).
                  </div>
                </div>
                <MDBTextArea
                  wrapperClass="mb-4"
                  id="translationText"
                  rows={4}
                  label="Enter your translation text."
                  value={translateTextInput}
                  onChange={translationTextInputHandler}
                />

                <MDBTextArea
                  wrapperClass="mb-4"
                  id="translatedText"
                  rows={4}
                  label="The translated text will appear here."
                  value={translatedTextInput}
                  onChange={(e) => setTranslatedTextInput(e.target.value)}
                />
                <MDBBtn type="submit" block disabled={!allowTranslation}>
                  Translate
                </MDBBtn>
              </MDBCardBody>
            </form>
            <MDBCardFooter className="text-muted">
              <div className="text-center">
                Presented by
                <br />
                <MDBCardImage
                  src={CallforCodeLogo}
                  position="top"
                  alt="..."
                  className="w-50"
                />
              </div>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
        <MDBCol size="md"></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default App;
