import pandas as pd
import sqlite3
import os
import pandas as pd



async def read_csv(data: str):
    con = sqlite3.connect("database/portal_mammals.sqlite")
    surveys_df = pd.read_sql_query("SELECT * from surveys", con)
    surveys2002 = surveys_df[surveys_df.year == 2002]
    surveys2002.to_sql("surveys2002", con, if_exists="replace")
    con.close()


