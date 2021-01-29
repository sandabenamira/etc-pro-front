import React from 'react';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

const IconCode = [
  {
    value: 1,
    name: 'p-1 icon-btn zmdi zmdi-bus zmdi-hc-2x',
  },
  {
    value: 2,
    name: 'p-1 icon-btn zmdi zmdi-balance zmdi-hc-2x',
  },
  {
    value: 3,
    name: 'p-1 icon-btn zmdi zmdi-cutlery zmdi-hc-2x',
  },

  {
    value: 4,
    name: 'p-1 icon-btn zmdi zmdi-palette zmdi-hc-2x',
  },
  {
    value: 5,
    name: 'p-1 icon-btn zmdi zmdi-airplane zmdi-hc-2x',
  },
  {
    value: 6,
    name: 'p-1 icon-btn zmdi zmdi-playstation zmdi-hc-2x',
  },
  {
    value: 7,
    name: 'p-1 icon-btn zmdi zmdi-movie zmdi-hc-2x',
  },
  {
    value: 8,
    name: 'p-1 icon-btn zmdi zmdi-run zmdi-hc-2x',
  },
  {
    value: 9,
    name: 'p-1 icon-btn zmdi zmdi-library zmdi-hc-2x',
  },
  {
    value: 10,
    name: 'p-1 icon-btn zmdi zmdi-graduation-cap zmdi-hc-2x',
  },
];

class ImageGridList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      className: '',
    };
    this.handleIconName = this.handleIconName.bind(this);
  }
  handleIconName(event) {
    this.setState((previousState) => ({
      color: !previousState.color,
    }));
    this.setState({
      className: event.target.className,
    });

    this.props.handleIcon(event.target.className);
  }
  render() {
    return (
      <div>
        <GridList spacing={20} cellHeight={40}>
          <Grid container spacing={3}>
            {IconCode.map((code) => {
              let colorIcon;
              if (this.state.className == code.name) {
                colorIcon = 'blue';
              } else {
                colorIcon = 'black';
              }
              return (
                <i
                  key={code.value}
                  className={code.name}
                  style={{ color: colorIcon, cursor: 'pointer' }}
                  onClick={this.handleIconName}
                />
              );
            })}
          </Grid>
        </GridList>
      </div>
    );
  }
}

export default ImageGridList;
