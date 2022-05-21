import { Paper } from "@mui/material"
import React from "react"
import { Correspondence } from "../../component/Dialogs/Correspondence"
import { Interlocutors } from "../../component/Dialogs/Interlocutors"
import st from "./Dialogs.module.scss"

export const DialogsPage: React.FC = () => {
  return (
    <div className={st.dialogs}>
      <Paper className={st.interlocutors}>
        <Interlocutors />
      </Paper>
      <Paper className={st.correspondence}>
        <Correspondence />
      </Paper>
    </div>
  )
}
