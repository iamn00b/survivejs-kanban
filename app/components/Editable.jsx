import React from 'react';

export default class Editable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue : props.value
    };
  }

  render() {
    const {editing, ...props} = this.props;

    return (
      <div {...props}>
        {editing ?
          this.renderEdit()
          :
          this.renderValue()
        }
      </div>
    );
  }

  renderEdit = () => {
    return (
      <input 
        type="text"
        ref={
          (e) => e ? e.selectionStart = this.state.inputValue.length : null
        }
        value={this.state.inputValue}
        autoFocus={true}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
        onChange={this.handleChange} />
    );
  };

  renderValue = () => {
    return (
      <div onClick={this.props.onValueClick}>
        <span>{this.props.value}</span>
        {this.props.onDelete ? 
          <button className="deleteBtn" onClick={this.props.onDelete}>x</button>
        :
          null}
      </div>
    );
  };

  handleChange = (e) => {
    const inputValue = e.target.value;

    this.setState({ inputValue });
  };

  checkEnter = (e) => {
    if (e.key === 'Enter')
      this.finishEdit();
  };

  finishEdit = () => {
    const value = this.state.inputValue;

    if (this.props.onEdit && value.trim()) {
      this.props.onEdit(value);
    }
  };
}