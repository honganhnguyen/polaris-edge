import axios from 'axios';

export const getGoogleInfoByAccessToken = async (accessToken: string) => {
  try {
    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const {
      given_name: firstName,
      family_name: lastName,
      email,
    } = userInfoResponse.data;
    return { firstName, lastName, email };
  } catch (error) {
    console.error('Error fetching Google user info:', error);
  }
};

export const getMicrosoftInfoByAccessToken = async (accessToken: string) => {
  try {
    const userInfoResponse = await axios.get(
      'https://graph.microsoft.com/v1.0/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const {
      givenName: firstName,
      surname: lastName,
      mail: email,
    } = userInfoResponse.data;
    return { firstName, lastName, email };
  } catch (error) {
    console.error('Error fetching Microsoft user info:', error);
  }
};
