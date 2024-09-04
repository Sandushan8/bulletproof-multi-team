Multi-Team Functionality

#Overview
The application now supports users registering with multiple teams. Due to current backend limitations, which only accept a single teamId input, a workaround has been implemented to provide the multi-team functionality.

#Implementation Details

#Team Selection on Account Creation:

    Users can select multiple teams during account creation.
    Although the interface allows the selection of multiple teams, only one teamId is sent to the backend due to current backend validation constraints.

#Team Switching Functionality:

    After registering as a multi-team user, you can switch between teams using the "Switch Team" option available below the 'Your Profile' section.
    A modal will appear where you can select the team you wish to switch to.
    This functionality is available only to users who registered with multiple teams.

#Session Storage:

    Since the backend does not currently support multiple teamIds, the selected team data is stored in session storage to facilitate the team-switching feature.
    The stored team data is cleared when the user logs out.
    Upon logging in again, the session storage will be empty, so users will need to register with another account to test this functionality.

#Testing the Functionality

    To fully test the multi-team feature, it is recommended to register with another user and verify the team-switching process as described above.
