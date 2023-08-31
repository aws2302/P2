import React from "react";
import { Button } from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

export default function Stats() {
    
    return (
    <div>
      <Button className="StatsIcon" aria-label="StatsIcon">
        <QueryStatsIcon className="S-Icon" />
      </Button>
    </div>
    )
   };
