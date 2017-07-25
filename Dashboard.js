import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vocabularies: [],
    };
  }

  componentDidMount() {
    axios(`//${process.env.API_URL}/api/vocabularies`)
      .then(({ data }) => {
        this.setState({
          vocabularies: data.vocabularies,
        });
      });
  }

  render() {
    return (
      <div className='Dashboard'>
        <table className='Vocabularies'>
          <thead>
            <tr>
              <th></th>
              <th>MI</th>
              <th>RI</th>
              <th>Tries</th>
            </tr>
          </thead>
          <tbody>
            { this.state.vocabularies.map((v, index) =>
              <tr key={index} className='Vocabulary'>
                <td className='Vocabulary__char'>
                  <a href={`https://www.wanikani.com/vocabulary/${v.character}`} target='_blank'>{v.character}</a>
                </td>
                { v.user_specific &&
                  <td>
                    {v.user_specific.meaning_incorrect}
                  </td>
                }
                { v.user_specific &&
                  <td>
                    {v.user_specific.reading_incorrect}
                  </td>
                }
                { v.user_specific &&
                  <td>
                    {v.tries}
                  </td>
                }
              </tr>
            ) }
          </tbody>
        </table>
      </div>
    );
  }
}

Dashboard.propTypes = {
};

Dashboard.defaultProps = {
};

export default Dashboard;
