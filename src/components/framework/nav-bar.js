import React from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Flex from "./flex";
import { titleColors } from "../../util/globals";
import { darkGrey, brandColor, materialButton } from "../../globalStyles";
import { changePage } from "../../actions/navigation";
import { TOGGLE_NARRATIVE } from "../../actions/types";

const InternalLink = (props) => (
  <div style={props.style} onClick={() => props.dispatch(changePage({path: props.path}))}>
    {props.children}
  </div>
);

@connect((state) => {
  return {
    narrativeLoaded: state.narrative.loaded,
    narrativeDisplayed: state.narrative.display,
    browserDimensions: state.browserDimensions.browserDimensions
  };
})
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  getStyles() {
    return {
      main: {
        maxWidth: 960,
        marginTop: "auto",
        marginRight: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        left: 0,
        zIndex: 1001,
        transition: "left .3s ease-out",
        // backgroundColor: "#E1E1E1"
      },
      drawer: {
        maxWidth: 960,
        flexDirection: "column",
        marginTop: "auto",
        marginRight: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        height: "auto",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        left: 0,
        zIndex: 1001,
        transition: "left .3s ease-out",
        backgroundColor: "#AAA",
        boxShadow: '0px 0px 5px -1px rgba(0, 0, 0, 0.7) inset'
      },
      logo: {
        paddingLeft: "8px",
        paddingRight: "8px",
        paddingTop: "20px",
        paddingBottom: "20px",
        color: "#000",
        cursor: "pointer",
        textDecoration: "none",
        fontSize: this.props.minified ? 12 : 16
      },
      title: {
        padding: "0px",
        color: "#000",
        textDecoration: "none",
        fontSize: 20,
        fontWeight: 400,
        cursor: "pointer"
      },
      link: {
        paddingLeft: this.props.minified ? "6px" : "12px",
        paddingRight: this.props.minified ? "6px" : "12px",
        paddingTop: "12px",
        paddingBottom: "12px",
        textDecoration: "none",
        cursor: "pointer",
        fontSize: this.props.minified ? 20 : 16,
        fontWeight: 400,
        textTransform: "uppercase"
      },
      inactive: {
        paddingLeft: this.props.minified ? "6px" : "12px",
        paddingRight: this.props.minified ? "6px" : "12px",
        paddingTop: "20px",
        paddingBottom: "20px",
        color: "#5097BA",
        textDecoration: "none",
        fontSize: this.props.minified ? 12 : 16,
        fontWeight: 400,
        textTransform: "uppercase"
      },
      alerts: {
        textAlign: "center",
        verticalAlign: "middle",
        width: 70,
        color: brandColor
      },
      icon: {
        width: 22,
        height: 50,
        lineHeight: "50px",
        marginLeft: 10,
        marginRight: 10,
        verticalAlign: "middle",
        cursor: "pointer",
        color: "#555",
        fontSize: 26
      }
    };
  }

  getLogo(styles) {
    return (
      <InternalLink dispatch={this.props.dispatch} style={styles.logo} path="/">
        <img alt="" width="40" src={require("../../images/nextstrain-logo-small.png")}/>
      </InternalLink>
    );
  }

  getLogoType(styles) {
    const title = "nextstrain";
    const rainbowTitle = title.split("").map((letter, i) =>
      <span key={i} style={{color: titleColors[i] }}>{letter}</span>
    );
    return (
      <InternalLink style={styles.title} dispatch={this.props.dispatch} path="/">
        {rainbowTitle}
      </InternalLink>
    );
  }

  getLink(name, url, selected, styles) {
    const linkCol = this.props.minified ? "#fff" : darkGrey;
    return (
      selected ?
        <div style={{ ...{color: linkCol}, ...styles.inactive }}>{name}</div> :
        <InternalLink dispatch={this.props.dispatch} style={{ ...{color: linkCol}, ...styles.link }} path={url}>
          {name}
        </InternalLink>
    );
  }

  getToggle(styles) {
    return (
      <div style={styles.icon}>
        <i className="fa fa-bars" aria-hidden="true"/>
      </div>
    );
  }

  render() {
    const styles = this.getStyles();
    if (this.props.narrativeLoaded) {
      const onClick = () => {this.props.dispatch({ type: TOGGLE_NARRATIVE});};
      const text = this.props.narrativeDisplayed ? "show controls" : "show narrative";
      return (
        <Flex style={styles.main}>
          {this.getLogo(styles)}
          {this.getLogoType(styles)}
          <div style={{flex: 5}}/>
          <button style={materialButton} onClick={onClick}>
            {text}
          </button>
          <div style={{width: this.props.minified ? 8 : 0 }}/>
        </Flex>
      );
    }
    return (
      <div>
        <Flex style={styles.main}>
          {this.getLogo(styles)}
          {this.getLogoType(styles)}
          <div style={{flex: 5}}/>
          {this.getToggle(styles)}
          <div style={{width: this.props.minified ? 8 : 0 }}/>
        </Flex>
        <Flex style={styles.drawer}>
          {this.getLink("Datasets", "/", this.props.methodsSelected, styles)}
          {this.getLink("Docs", "/", this.props.aboutSelected, styles)}
          {this.getLink("Posts", "/", this.props.methodsSelected, styles)}
        </Flex>
      </div>
    );
  }
}

export default NavBar;
