import { Profile } from "server/models";

export type Msg =
  | ["profile/select", { userid: string }]
  | [
      "profile/save",
      {
        userid: string;
        profile: Profile;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ];
// | ["button/index", { userid: string }]
// | ["button/select", { buttonid: string }];
//   | [
//       "button/save",
//       {
//         buttonid: string;
//         button: ButtonConfig[];
//         onSuccess?: () => void;
//         onFailure?: (err: Error) => void;
//       }
//     ];
