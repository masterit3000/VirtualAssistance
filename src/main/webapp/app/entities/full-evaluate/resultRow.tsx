import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { CustomInput, Card, CardHeader, CardBody, Button, Collapse, Row, Col, Label, Container } from 'reactstrap';
import { SERVER_API_URL } from 'app/config/constants';
class ResultRow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      answer: props.answer,
      key: props.key
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  download(link) {
    return (
      <a href={`api/downloadFileProof/${link}`}>
        <Button replace color="primary">
          <FontAwesomeIcon icon="download" /> Download
        </Button>
      </a>
    );
  }

  render() {
    const answer = this.state.answer;
    return (
      <tr key={this.state.key}>
        <td className="text-left">
          <Card>
            <CardHeader>
              <strong>{answer.criteriaEvaluate ? answer.criteriaEvaluate.content : ''}</strong>
              <Button color="link" onClick={this.toggle} className="float-right" id={'toggleCollapse' + this.state.key}>
                Minh chứng
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.collapse}>
              <CardBody>{answer.proof ? this.download(answer.proof) : 'Không có minh chứng'}</CardBody>
            </Collapse>
          </Card>
        </td>
        <td>
          <Translate contentKey={`virtualAssistantApp.ScoreLadder.${answer.scoreLadder}`} />
        </td>
      </tr>
    );
  }
}

export default ResultRow;
