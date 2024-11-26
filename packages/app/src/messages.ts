// import { ButtonConfig } from "server/models";

export type Msg =
  | ["button/index", { userid: string }]
  | ["button/select", { buttonid: string }];
//   | [
//       "button/save",
//       {
//         buttonid: string;
//         button: ButtonConfig[];
//         onSuccess?: () => void;
//         onFailure?: (err: Error) => void;
//       }
//     ];
