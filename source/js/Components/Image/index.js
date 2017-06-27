import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

import expect from '../../Services/Expect';
import ID from '../../Services/ID';

import Loader from '../../Containers/Loader';

import { BREAKPOINTS } from '../../../config';

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: this.props.autoload
    };

    // console.log(this.getSrc());
    this.getSrcSet();
  }

  static get defaultProps() {
    return {
      autoload: false,
      forceSize: false,
      alt: '',
      title: ''
    }
  }

  isSrcSet() {
    return expect.anObject(this.props.src);
  }

  getSrc() {
    return this.isSrcSet() ? this.props.src[0] : this.props.src;
  }

  getSrcSet() {
    const srcset = [];
    let i = 0;

    for (const point of BREAKPOINTS) {
      if (point.size !== 0) {
        srcset.push({ size: point.size, src: Object.values(this.props.src)[i] });
        // srcset.push(`${Object.values(this.props.src)[i]} ${point.size}w`);
        ++i;
      }
    }

    // We make sure that the array is ordered from biggest to smallest breakpoint
    return srcset.sort((a, b) => b.size - a.size);
  }

  returnPictureCode() {
    return <picture>
      {this.getSrcSet().map(item => <source key={ID()} media={`(min-width: ${item.size}px)`} srcSet={item.src} />)}
      <img src={this.getSrcSet()[0].src} />
    </picture>
  }

  returnPicture() {
    return <Waypoint onEnter={() => { this.setState({ loaded: true }) }}>
      <div className={`picture ${this.state.loaded ? 'picture--loaded' : 'picture--loading'}`}>{this.state.loaded ? this.returnPictureCode() : <Loader />}</div>
    </Waypoint>
  }

  returnImg() {
    return <img src={this.getSrc()} alt={this.props.alt} title={this.props.title} />;
  }

  render() {
    return this.isSrcSet() ? this.returnPicture() : this.returnImg()
  }
}

export default Image;