export default class IUIText{

    constructor(x, y, iFontSize, strCaption, eAlignType)
    {
        this.x = x;
        this.y = y;
        this.strCaption = strCaption;
        this.iFontSize = iFontSize;
        this.OriginFontSize = iFontSize;

        //this.strFont = `$bold ${iFontSize}px Georgia`;
        //this.strFont = `'${iFontSize}px Georgia'`;
        this.strFont = iFontSize.toString()+'px Hahmlet';
        //alert(this.strFont);
        

        this.iCurrentX = x;
        this.iCurrentY = y;

        this.eAlignType = eAlignType;

        this.iLength = strCaption.length;
    }

    OnSize(fHR, fVR)
    {
        this.iCurrentX = this.x * fHR;
        this.iCurrentY = this.y * fVR;

        this.iFontSize = this.OriginFontSize * fHR;
        this.strFont = this.iFontSize.toString()+'px Hahmlet';

        console.log(`this.iFontSize : ${this.iFontSize}`);
    }

    SetLocation(x, y)
    {
        this.x = x;
        this.y = y;

        this.iCurrentX = x;
        this.iCurrentY = y;
    }

    Render(ctx) 
    {
        if ( this.eAlignType == 0 )  // Center
        {
            ctx.textAlign = "center";
            //current_x = this.iCurrentX - (this.iLength/2) + (i*this.iFontSize);
        }                
        else if ( this.eAlignType == 1 ) // Left
        {
            ctx.textAlign = "left";
            //current_x = this.iCurrentX + (i*this.iFontSize);
        }                
        else if ( this.eAlignType == 2 ) // Right
        {
            ctx.textAlign = "right";
            //current_x = this.iCurrentX - this.iLength + (i*this.iFontSize);
        }

        //this.iCurrentX = current_x;

        ctx.font = this.strFont;
        ctx.fillStyle = "white";
        ctx.fillText(this.strCaption, this.iCurrentX, this.iCurrentY);
    }

    UpdateCaption(strCaption)
    {
        this.strCaption = strCaption;
    }

    UpdateFontSize(iWidth)
    {
        this.iFontSize = Math.round(iWidth * 0.015);
        this.strFont = this.iFontSize.toString()+'px Hahmlet';
    }
}