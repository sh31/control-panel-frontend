import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="govuk-footer ">
      <div className="govuk-width-container">
        <div className="govuk-footer__navigation">
          <div className="govuk-footer__section">
            <h2 className="govuk-footer__heading govuk-heading-m">
              Related resources
            </h2>
            <ul className="govuk-footer__list">
              <li className="govuk-footer__list-item">
                <a className="govuk-footer__link" href="google.com">
                  Platform user guidance
                </a>
              </li>
              <li className="govuk-footer__list-item">
                <a className="govuk-footer__link" href="google.com">
                  Platform support
                </a>
              </li>
              <li className="govuk-footer__list-item">
                <a className="govuk-footer__link" href="google.com">
                  R Slack channel
                </a>
              </li>
              <li className="govuk-footer__list-item">
                <a className="govuk-footer__link" href="google.com">
                  Python slack channel
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="govuk-footer__section-break"></hr>
      </div>
    </footer>
  );
};

export default Footer;
