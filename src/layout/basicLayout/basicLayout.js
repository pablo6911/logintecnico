import React from 'react'
import { Row, Col } from 'react-bootstrap'
import LeftMenu from '../../components/LeftMenu/leftMenu'

import '../../assets/scss/styles.scss'

export default function BasicLayout(props) {
  const { className, children } = props
  console.log(props)
  return (
    <div className={`basic-layout ${className}`}>
      <Row>
        <Col className="basic-layout_menu">
          <LeftMenu />
        </Col>
        <Col xs={9} className="basic-layout_content">
          {children}
        </Col>
      </Row>
    </div>
  )
}
