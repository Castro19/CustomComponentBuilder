import { Auth, Update } from "@calpoly/mustang";
import { ButtonConfig, Profile } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  console.log("Update:", message);
  switch (message[0]) {
    case "profile/save":
      saveProfile(message[1], user)
        .then((profile) => apply((model) => ({ ...model, profile })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "profile/select":
      selectProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;
    case "button/save":
      console.log("Saving button:", message[1]);
      saveButton(message[1])
        .then((buttonConfig) => apply((model) => ({ ...model, buttonConfig })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    // case "button/index":
    //   indexButtons(user).then((buttonIndex: ButtonConfig[] | undefined) =>
    //     apply((model) => ({ ...model, buttonIndex }))
    //   );
    //   break;
    // case "button/select":
    //   selectButton(message[1], user).then((button: ButtonConfig | undefined) =>
    //     apply((model) => ({ ...model, button }))
    //   );
    //   break;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
  }
}

function saveProfile(
  msg: {
    userid: string;
    profile: Profile;
  },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.profile),
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else throw new Error(`Failed to save profile for ${msg.userid}`);
    })
    .then((json: unknown) => {
      if (json) return json as Profile;
      return undefined;
    });
}

function selectProfile(msg: { userid: string }, user: Auth.User) {
  return fetch(`/api/profiles/${msg.userid}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as Profile;
      }
    });
}

function saveButton(msg: { buttonConfig: ButtonConfig }) {
  console.log("Saving button:", msg.buttonConfig);
  return fetch("/api/button", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg.buttonConfig),
  })
    .then((response: Response) => {
      if (response.ok) return response.json();
      else
        throw new Error(
          `Failed to save button configuration: ${response.statusText}`
        );
    })
    .then((json: unknown) => json as ButtonConfig);
}

// async function indexButtons(user: Auth.User) {
//   const userid = user.username;

//   return fetch(`/api/buttons?userid=${userid}`, {
//     headers: Auth.headers(user),
//   })
//     .then((response: Response) => {
//       if (response.status !== 200) throw `Failed to load index of buttons`;
//       return response.json();
//     })
//     .then((json: unknown) => {
//       if (json) {
//         const { data } = json as {
//           data: ButtonConfig[];
//         };
//         return data;
//       }
//     });
// }

// async function selectButton(msg: { buttonid: string }, user: Auth.User) {
//   return fetch(`/api/buttons/${msg.buttonid}`, {
//     headers: Auth.headers(user),
//   })
//     .then((response: Response) => {
//       if (response.status === 200) {
//         return response.json();
//       }
//       return undefined;
//     })
//     .then((json: unknown) => {
//       if (json) {
//         console.log("Button:", json);
//         return json as ButtonConfig;
//       }
//     });
// }

// async function saveButton(
//   msg: {
//     buttonid: string;
//     index: number;
//     button: ButtonConfig;
//   },
//   user: Auth.User
// ) {
//   return fetch(`/api/buttons/${msg.buttonid}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       ...Auth.headers(user),
//     },
//     body: JSON.stringify(msg.button),
//   })
//     .then((response: Response) => {
//       if (response.status === 200) return response.json();
//       else throw new Error(`Failed to save destination ${msg.index}`);
//     })
//     .then((json: unknown) => {
//       if (json) {
//         return json as ButtonConfig;
//       }
//       return undefined;
//     });
// }
