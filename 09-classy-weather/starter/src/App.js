import React from "react";

export default class App extends React.Component {
  state = {
    location: "Cairo",
    isLoading: false,
    error: null,
    displayedLocation: null,
    weatherDaily: null,
  };

  formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  convertToFlag(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  getWeather = async () => {
    try {
      this.setState({ isLoading: true });
      this.setState({ error: null });
      this.setState({ location: "" });
      this.setState({ displayedLocation: "" });
      this.setState({ weatherDaily: null })
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayedLocation: `${name} ${this.convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weatherDaily: weatherData.daily });
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const handleChange = (e) => {
      this.setState({ location: e.target.value });
    };

    // const btnStyle = {
    //   fontSize: "28px",
    //   padding: "10px",
    //   color: "#111",
    //   background: "#29a6d4",
    //   cursor: "pointer",
    // };

    return (
      <div className="app">
        <h1> Classy weather </h1>
        <input
          type="text"
          value={this.state.location}
          onChange={handleChange}
          placeholder="Enter city..."
          disabled={this.state.isLoading}
        />
        <button
          // style={btnStyle}
          onClick={this.getWeather}
          disabled={this.state.isLoading}
        >
          {" "}
          Fetch Wether{" "}
        </button>
        {this.state.isLoading && !this.state.error && <p>Loading...</p>}
        {!this.state.isLoading && this.state.error && <p className="loader">{this.state.error}</p>}

        {this.state.displayedLocation && (
          <h2> {this.state.displayedLocation} </h2>
        )}
        {this.state.weatherDaily && (
          <ul className="weather">
            {Array.from(
              { length: this.state.weatherDaily.time.length },
              (_, i) => (
                <li className="day" key={i + 1}>
                  <span >
                    {this.formatDay(this.state.weatherDaily.time[i])}
                  </span>
                  <span >
                    {this.getWeatherIcon(
                      this.state.weatherDaily.weathercode[i]
                    )}
                  </span>
                  <span className="important">
                    {this.state.weatherDaily.temperature_2m_max[i]}°C
                  </span>
                  <span className="important">{this.state.weatherDaily.temperature_2m_min[i]}°C </span>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    );
  }
}
