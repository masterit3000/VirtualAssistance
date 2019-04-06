import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDocument } from 'app/shared/model/document.model';
import { getEntities as getDocuments } from 'app/entities/document/document.reducer';
import { INotification } from 'app/shared/model/notification.model';
import { getEntities as getNotifications } from 'app/entities/notification/notification.reducer';
import { getEntity, updateEntity, createEntity, reset } from './document-type.reducer';
import { IDocumentType } from 'app/shared/model/document-type.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDocumentTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IDocumentTypeUpdateState {
  isNew: boolean;
  documentId: number;
  notificationId: number;
}

export class DocumentTypeUpdate extends React.Component<IDocumentTypeUpdateProps, IDocumentTypeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      documentId: 0,
      notificationId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDocuments();
    this.props.getNotifications();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { documentTypeEntity } = this.props;
      const entity = {
        ...documentTypeEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/document-type');
  };

  render() {
    const { documentTypeEntity, documents, notifications, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="virtualAssistantApp.documentType.home.createOrEditLabel">
              <Translate contentKey="virtualAssistantApp.documentType.home.createOrEditLabel">Create or edit a DocumentType</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : documentTypeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="document-type-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    <Translate contentKey="virtualAssistantApp.documentType.content">Content</Translate>
                  </Label>
                  <AvField id="document-type-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label id="levelLabel">
                    <Translate contentKey="virtualAssistantApp.documentType.level">Level</Translate>
                  </Label>
                  <AvInput
                    id="document-type-level"
                    type="select"
                    className="form-control"
                    name="level"
                    value={(!isNew && documentTypeEntity.level) || 'LEVEL1'}
                  >
                    <option value="LEVEL1">
                      <Translate contentKey="virtualAssistantApp.Level.LEVEL1" />
                    </option>
                    <option value="LEVEL2">
                      <Translate contentKey="virtualAssistantApp.Level.LEVEL2" />
                    </option>
                    <option value="LEVEL3">
                      <Translate contentKey="virtualAssistantApp.Level.LEVEL3" />
                    </option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/document-type" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  documents: storeState.document.entities,
  notifications: storeState.notification.entities,
  documentTypeEntity: storeState.documentType.entity,
  loading: storeState.documentType.loading,
  updating: storeState.documentType.updating
});

const mapDispatchToProps = {
  getDocuments,
  getNotifications,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentTypeUpdate);
