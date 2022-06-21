import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <Container className="no-gutters">
        <Row className={styles.footerContent}>
          <Col>
            <div className={styles.footerColumn}>
              © &nbsp; {new Date().getFullYear()} &nbsp; askIBU
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
