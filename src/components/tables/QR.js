import React from 'react';
import { Modal, Button } from '@material-ui/core';
import QRCode from "qrcode.react";
import DownloadIcon from "@material-ui/icons/ArrowDownward";

function QR(
    table,
    showQr,
    setShowQr,
) {
    
    const downloadQR = () => {
        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${table.tableNumber}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        // handleSetShowQr();
      };
    return (
        <Modal
        open={showQr}
        onClose={()=> setShowQr(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{alignSelf:"center", alignItems:"center", justifyContent:"center", display:"flex"}}
      >
      <div>
          <QRCode
            id={"qrcode"}
            value={JSON.stringify(table)}
            size={256}
            level={"H"}
            includeMargin={true}
          />
          <button>
            <Button
              size="small"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={() => downloadQR()}
            >
              Download QR
            </Button>
            </button>
        </div>
      </Modal>
    );
}

export default QR;