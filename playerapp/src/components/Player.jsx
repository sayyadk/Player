import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Card, CardContent, Grid, ListItem, TextField } from "@mui/material";

export const Player = () => {
  const [data, setData] = useState([]);
  const [copydata, setCopyData] = useState([]);
  const [text, setText] = useState("");

  const getdata = async () => {
    const result = await axios.get(
      "https://api.npoint.io/20c1afef1661881ddc9c"
    );
    setData(result.data.playerList);
    setCopyData(result.data.playerList);
  };
  console.log(data);
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    const searchData = copydata.filter(
      (item) =>
        item.PFName.toUpperCase().includes(text.toUpperCase()) ||
        item.TName.toUpperCase().includes(text.toUpperCase())
    );
    setData(searchData);
  }, [text]);
  return (
    <React.Fragment>
        <TextField label="Search" onChange={(e) => setText(e.target.value)} fullWidth />
      <Grid container spacing={4}>
        {data.map((item, index) => {
          return (
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <img src={`./player/${item.Id}.jpg`} />
                  <p>Player Name: {`${item.PFName} (${item.SkillDesc})`}</p>
                  <p>Value: ${item.Value}</p>
                  upcomming matches:
                  {item.UpComingMatchesList.map((elem) => {
                    return (
                      <>
                        <p>
                          {elem.CCode} vs {elem.VsCCode}
                        </p>
                        <p>Match time: {elem.MDate}</p>
                      </>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};
