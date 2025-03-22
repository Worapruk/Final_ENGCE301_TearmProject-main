/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react'
import { Container } from './style.js'
import { Row, Col, Badge, Card } from 'react-bootstrap'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Parse from '../../parse-init.js'

export default class Histories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // User login
      userLoginHistoriesData: [],
      userLoginHistoriesPage: 0,
      userLoginHistoriesTotal: 0,
      // Agent status
      agentStatusHistoriesData: [],
      agentStatusHistoriesPage: 0,
      agentStatusHistoriesTotal: 0,
      // Agent message
      agentMessageHistoriesData: [],
      agentMessageHistoriesPage: 0,
      agentMessageHistoriesTotal: 0,
    }
  }

  async initUserLoginHistories() {
    let histories = Parse.Object.extend('UserLoginHistories')
    let queryHistories = new Parse.Query(histories)
    // Start listening for real-time updates.
    const historiesListener = await queryHistories.subscribe()
    historiesListener.on('open', () => {
      console.log('UserLoginHistories subscription opened')
    })
    historiesListener.on('create', async (object) => {
      console.log('UserLoginHistories has been created', object)
      if (this.state.userLoginHistoriesData.length >= 10) {
        this.state.userLoginHistoriesData.pop()
      }

      this.setState({
        userLoginHistoriesData: [object, ...this.state.userLoginHistoriesData],
      })
    })

    // Next query data
    const result = await Parse.Cloud.run('getUserLoginHistories', {
      page: 0,
      size: 10,
    })
    this.setState({
      userLoginHistoriesData: result.data || [],
      userLoginHistoriesPage: result.pagination.pagination || 0,
      userLoginHistoriesTotal: result.pagination.totalPage || 0,
    })
  }

  async initAgentStatusHistories() {
    let histories = Parse.Object.extend('AgentStatusHistories')
    let queryHistories = new Parse.Query(histories)
    // Start listening for real-time updates.
    const historiesListener = await queryHistories.subscribe()
    historiesListener.on('open', () => {
      console.log('AgentStatusHistories subscription opened')
    })
    historiesListener.on('create', async (object) => {
      console.log('AgentStatusHistories has been created', object)
      if (this.state.agentStatusHistoriesData.length >= 10) {
        this.state.agentStatusHistoriesData.pop()
      }

      this.setState({
        agentStatusHistoriesData: [object, ...this.state.agentStatusHistoriesData],
      })
    })

    // Next query data
    const result = await Parse.Cloud.run('getAgentStatusHistories', {
      page: 0,
      size: 10,
    })
    this.setState({
      agentStatusHistoriesData: result.data || [],
      agentStatusHistoriesPage: result.pagination.pagination || 0,
      agentStatusHistoriesTotal: result.pagination.totalPage || 0,
    })
  }

  async initAgentMessageHistories() {
    let histories = Parse.Object.extend('AgentMessageHistories')
    let queryHistories = new Parse.Query(histories)
    // Start listening for real-time updates.
    const historiesListener = await queryHistories.subscribe()
    historiesListener.on('open', () => {
      console.log('AgentMessageHistories subscription opened')
    })
    historiesListener.on('create', async (object) => {
      console.log('AgentMessageHistories has been created', object)
      if (this.state.agentMessageHistoriesData.length >= 10) {
        this.state.agentMessageHistoriesData.pop()
      }

      this.setState({
        agentMessageHistoriesData: [object, ...this.state.agentMessageHistoriesData],
      })
    })

    // Next query data
    const result = await Parse.Cloud.run('getAgentMessageHistories', {
      page: 0,
      size: 10,
    })
    this.setState({
      agentMessageHistoriesData: result.data || [],
      agentMessageHistoriesPage: result.pagination.pagination || 0,
      agentMessageHistoriesTotal: result.pagination.totalPage || 0,
    })
  }

  transfromStateToText(status) {
    return {
      1: 'Available',
      2: 'Active',
      3: 'Wrap',
      4: 'Not Ready ',
    }[status]
  }

  transfromStateToTextColor(status) {
    return {
      1: 'bg-success text-white',
      2: 'bg-info',
      3: 'bg-warning',
      4: 'bg-danger text-white',
    }[status]
  }

  componentDidMount() {
    this.initUserLoginHistories()
    this.initAgentStatusHistories()
    this.initAgentMessageHistories()
  }

  formatDateTime(date) {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  renderEmptyState(title) {
    return (
      <CTableRow>
        <CTableDataCell colSpan="4" className="text-center py-5">
          <div className="my-3">
            <i className="fas fa-inbox fa-3x text-muted"></i>
            <h5 className="mt-3 text-muted">No {title} records found</h5>
            <p className="text-muted">New records will appear here automatically</p>
          </div>
        </CTableDataCell>
      </CTableRow>
    )
  }

  render() {
    return (
      <Container className="mt-4">
        <Row className="mb-4">
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">
                  <i className="fas fa-comment-dots me-2"></i>Agent Message History
                </h4>
              </Card.Header>
              <Card.Body>
                <CTable hover responsive className="border-top">
                  <CTableHead>
                    <CTableRow className="bg-light">
                      <CTableHeaderCell scope="col" style={{ width: '20%' }}>
                        <i className="far fa-clock me-1"></i> Date & Time
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: '20%' }}>
                        <i className="fas fa-user me-1"></i> From Agent
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: '20%' }}>
                        <i className="fas fa-user-friends me-1"></i> To Agent
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: '40%' }}>
                        <i className="fas fa-envelope me-1"></i> Message
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {this.state.agentMessageHistoriesData.length > 0 ? 
                      this.state.agentMessageHistoriesData.map((i, key) => (
                        <CTableRow key={key}>
                          <CTableHeaderCell scope="row">
                            {this.formatDateTime(i.get('createdAt'))}
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <Badge bg="secondary" className="me-1">{i.get('from_agent_code')}</Badge>
                          </CTableDataCell>
                          <CTableDataCell>
                            <Badge bg="info" className="me-1">{i.get('to_agent_code')}</Badge>
                          </CTableDataCell>
                          <CTableDataCell className="message-cell">
                            <div className="message-content">{i.get('message')}</div>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                      : this.renderEmptyState("message")
                    }
                  </CTableBody>
                </CTable>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mb-4">
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">
                  <i className="fas fa-sign-in-alt me-2"></i>Agent Login History
                </h4>
              </Card.Header>
              <Card.Body>
                <CTable hover responsive className="border-top">
                  <CTableHead>
                    <CTableRow className="bg-light">
                      <CTableHeaderCell scope="col" style={{ width: '30%' }}>
                        <i className="far fa-clock me-1"></i> Date & Time
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: '40%' }}>
                        <i className="fas fa-user me-1"></i> Agent Information
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: '30%' }}>
                        <i className="fas fa-key me-1"></i> Action
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {this.state.userLoginHistoriesData.length > 0 ? 
                      this.state.userLoginHistoriesData.map((i, key) => (
                        <CTableRow key={key}>
                          <CTableHeaderCell scope="row">
                            {this.formatDateTime(i.get('createdAt'))}
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <Badge bg="secondary" className="me-2">{i.get('agent_code')}</Badge>
                            <span className="fw-bold">{i.get('agent_name')}</span>
                          </CTableDataCell>
                          <CTableDataCell>
                            <Badge 
                              bg={i.get('is_login') === '1' ? 'success' : 'danger'} 
                              className="py-2 px-3"
                            >
                              {i.get('is_login') === '1' ? 
                                <><i className="fas fa-sign-in-alt me-1"></i> Login</> : 
                                <><i className="fas fa-sign-out-alt me-1"></i> Logout</>
                              }
                            </Badge>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                      : this.renderEmptyState("login")
                    }
                  </CTableBody>
                </CTable>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mb-4">
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-info text-white">
                <h4 className="mb-0">
                  <i className="fas fa-exchange-alt me-2"></i>Agent Status Changes
                </h4>
              </Card.Header>
              <Card.Body>
                <CTable hover responsive className="border-top">
                  <CTableHead>
                    <CTableRow className="bg-light">
                      <CTableHeaderCell scope="col" style={{ width: '25%' }}>
                        <i className="far fa-clock me-1"></i> Date & Time
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: '25%' }}>
                        <i className="fas fa-user me-1"></i> Agent Information
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: '25%' }}>
                        <i className="fas fa-arrow-right me-1"></i> From Status
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ width: '25%' }}>
                        <i className="fas fa-arrow-right me-1"></i> To Status
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {this.state.agentStatusHistoriesData.length > 0 ? 
                      this.state.agentStatusHistoriesData.map((i, key) => (
                        <CTableRow key={key}>
                          <CTableHeaderCell scope="row">
                            {this.formatDateTime(i.get('createdAt'))}
                          </CTableHeaderCell>
                          <CTableDataCell>
                            <Badge bg="secondary" className="me-2">{i.get('agent_code')}</Badge>
                            <span className="fw-bold">{i.get('agent_name')}</span>
                          </CTableDataCell>
                          <CTableDataCell>
                            <Badge 
                              className={`${this.transfromStateToTextColor(i.get('status_from'))} py-2 px-3`}
                            >
                              {this.transfromStateToText(i.get('status_from'))}
                            </Badge>
                          </CTableDataCell>
                          <CTableDataCell>
                            <Badge 
                              className={`${this.transfromStateToTextColor(i.get('status_to'))} py-2 px-3`}
                            >
                              {this.transfromStateToText(i.get('status_to'))}
                            </Badge>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                      : this.renderEmptyState("status change")
                    }
                  </CTableBody>
                </CTable>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <style jsx>{`
          .message-cell {
            max-width: 250px;
          }
          .message-content {
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
          }
        `}</style>
      </Container>
    )
  }
}