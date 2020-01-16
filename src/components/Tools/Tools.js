import React, { useEffect } from "react";
import "./Tools.scss";
import { useUserContext } from "../../UserContext";

const ToolRow = props => {
  return (
    <tr className="govuk-table__row sse-listener tool-status">
      <td className="govuk-table__cell">{props.name}</td>
      <td className="govuk-table__cell">{props.status}</td>
      <td className="govuk-table__cell align-right no-wrap"></td>
    </tr>
  );
};

const ToolTable = () => {
  const { tools, updateToolStatus } = useUserContext();

  useEffect(() => {
    const interval = setInterval(() => {
      updateToolStatus();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toolsList = [];
  for (var tool in tools) {
    toolsList.push(
      <ToolRow name={tool} status={tools[tool].status} key={tool} />
    );
  }

  return (
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th className="govuk-table__header govuk-!-width-one-half">Name</th>
          <th className="govuk-table__header govuk-!-width-one-quarter">
            Status
          </th>
          <th className="govuk-table__header govuk-!-width-one-quarter">
            <span className="govuk-visually-hidden">Action</span>
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">{toolsList}</tbody>
      <tfoot className="govuk-table__foot"></tfoot>
    </table>
  );
};

const Tools = () => {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
        <h1 className="govuk-heading-xl">Your Tools</h1>
        <p className="govuk-body">
          The status of your tools will update automatically.
        </p>
        <ToolTable />
      </main>
    </div>
  );
};

export default Tools;
