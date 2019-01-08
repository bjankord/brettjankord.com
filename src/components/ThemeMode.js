import React from 'react';
import kebabCase from "lodash/kebabCase";

class ThemeMode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'Light Mode'
    }

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    if (window && window.localStorage) {
      // On mount, read from localStorage to see if we have a stored value
      const storedTheme = window.localStorage.getItem('BJTheme');

      if (storedTheme) {
        // Set storedTheme in local state
        this.setState({ theme: storedTheme });
      } else {
        // If we haven't stored a theme, store the default theme in local storage
        window.localStorage.setItem('BJTheme', this.state.theme);
      }

      // Need mojave to test this logic
      // If the user prefers dark color scheme
      // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      //   // Save this preference to local storage
      //   window.localStorage.setItem('BrettJankordTheme', 'Dark Mode')
      //   // Save this preference to local state as well
      //   this.setState({ theme: 'Dark Mode' });
      // }
    }
  }

  componentDidUpdate() {
    // Remove old theme class
    this.state.theme === 'Light Mode' ?
      document.documentElement.classList.remove(kebabCase('Dark Mode')) : document.documentElement.classList.remove(kebabCase('Light Mode'));

    // Add New Theme Class
    document.documentElement.classList.add(kebabCase(this.state.theme));
  }

  handleOnClick() {
    if (this.state.theme === 'Light Mode') {
      window.localStorage.setItem('BJTheme', 'Dark Mode');
      this.setState({theme: 'Dark Mode'});
    }

    if (this.state.theme === 'Dark Mode') {
      window.localStorage.setItem('BJTheme', 'Light Mode');
      this.setState({ theme: 'Light Mode' });
    }
  }

  render() {
    let inverseTheme = this.state.theme === 'Light Mode' ? 'Dark Mode' : 'Light Mode';

    return (
      <span className="theme-switcher">Set site theme to: <button className="theme-switcher-btn" type="button" onClick={this.handleOnClick}>{inverseTheme}</button></span>
    );
  }
}

export default ThemeMode;