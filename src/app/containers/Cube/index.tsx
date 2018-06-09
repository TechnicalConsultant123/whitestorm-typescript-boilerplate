import * as React from 'react';
import {Box} from 'whs';
import * as THREE from 'three';

import { add, remove } from 'modules/world/';
import { IWorld, IWorldAction } from 'models/world';
const { connect } = require('react-redux');
import { ActionCreator } from 'redux';

interface IProps {
  world: IWorld;
  add: ActionCreator<IWorldAction>;
  remove: ActionCreator<IWorldAction>;
}

@connect(
  (state) => ({ world: state.world }),
  (dispatch) => ({
    add: () => dispatch(add()),
    remove: () => dispatch(remove())
  })
)

class Cube extends React.Component<IProps, any> {

  public constructor(props) {
    super(props);

    this.state = {
      world: null,
      object: null,
      material: null
    };
  }

  public componentWillUnmount() {
    const { world } = this.props;
    world.world.remove(this.state.object);
    this.setState({object: null});
  }

  public componentWillMount() {
    // let world = this.state.world;
    const { add, world } = this.props;
    if (!world.world) {
      add();
    }

    if (!this.state.object) {
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
      });

      this.setState({material});

      const object = new Box({
        geometry: {
          width: 15,
          height: 15,
          depth: 15
        },

        material,

        shadow: {
          receive: false
        },

        position: {
          x: 0,
          y: 0,
          z: 0
        }
      });

      this.setState({object});
    }
  }

  public render() {
    const { world } = this.props;
    if (world.world) {
      if (this.state.object) {
      world.world.add(this.state.object);
      }
    }
    return (
      <h4>Cube</h4>
    );
  }
}

export { Cube };
