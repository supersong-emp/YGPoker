export default class IImage{
    constructor(x, y, width, height, sprite, cSpriteWidth, cSpriteHeight)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.OriginSprite = sprite;
        this.iSpriteWidth = cSpriteWidth;
        this.iSpriteHeight = cSpriteHeight;

        this.iCurrentX = x;
        this.iCurrentY = y;
        this.iCurrentWidth = width;
        this.iCurrentHeight = height;

        this.fHR = 1;
        this.fVR = 1;

        this.iDirection = 0;

        this.fDealingCardElapsedTime = 0;
    }

    OnSize(fHR, fVR)
    {
        this.iCurrentX = this.x * fHR;
        this.iCurrentY = this.y * fVR;

        this.iCurrentWidth = this.width * fHR;
        this.iCurrentHeight = this.height * fVR;

        this.fHR = fHR;
        this.fVR = fVR;
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
        ctx.drawImage(
            this.sprite, 
            0, 
            0, 
            this.iSpriteWidth, 
            this.iSpriteHeight, 
            this.iCurrentX, 
            this.iCurrentY, 
            this.iCurrentWidth, 
            this.iCurrentHeight);
    }

    RenderLocation(ctx, x, y)
    {
        this.iCurrentX = x * this.fHR;
        this.iCurrentY = y * this.fVR;

        ctx.drawImage(
            this.sprite, 
            0, 
            0, 
            this.iSpriteWidth, 
            this.iSpriteHeight, 
            this.iCurrentX, 
            this.iCurrentY, 
            this.iCurrentWidth, 
            this.iCurrentHeight);
    }

    RenderRotation(ctx, angle)
    {
        // this.iCurrentX = x * this.fHR;
        // this.iCurrentY = y * this.fVR;

        let centerx = this.iCurrentX + this.iCurrentWidth/2;
        let centery = this.iCurrentY + this.iCurrentHeight/2;

        ctx.save();
        ctx.translate(centerx, centery);
        ctx.rotate(angle*Math.PI/180);
        ctx.translate(-centerx, -centery);

        ctx.drawImage(
            this.sprite, 
            0, 
            0, 
            this.iSpriteWidth, 
            this.iSpriteHeight, 
            this.iCurrentX, 
            this.iCurrentY, 
            this.iCurrentWidth, 
            this.iCurrentHeight);

        ctx.restore();
    }

    RenderLR(ctx, x, y, angle)
    {
        this.iCurrentX = x * this.fHR;
        this.iCurrentY = y * this.fVR;

        let centerx = this.iCurrentX + this.iCurrentWidth/2;
        let centery = this.iCurrentY + this.iCurrentHeight/2;

        ctx.save();
        ctx.translate(centerx, centery);
        ctx.rotate(angle*Math.PI/180);
        ctx.translate(-centerx, -centery);

        ctx.drawImage(
            this.sprite, 
            0, 
            0, 
            this.iSpriteWidth, 
            this.iSpriteHeight, 
            this.iCurrentX, 
            this.iCurrentY, 
            this.iCurrentWidth, 
            this.iCurrentHeight);

        ctx.restore();
    }
    CardRenderTurn(ctx, x, y, kTimer, cardturntype, strDeckCode)
    {
        this.iCurrentX = x*this.fHR;
        this.iCurrentY = y*this.fVR;
        if(this.iDirection == 0 )
        {
            if(strDeckCode == 1){
                this.sprite = imageCards[52];
            }
            else
            {
                this.sprite = imageCards[53];
            }
        }
        else 
        {
            this.sprite = this.OriginSprite;
        }
        // cardturntype = 0,1,2 : flopcard, 3 : turncard, 4 : rivercard
        if(cardturntype == 4)
        {
            if ( this.iDirection == 0)
            {
                this.iCurrentWidth -= kTimer.GetElapsedTime()*100;
                this.iCurrentX = (x*this.fHR) + ((this.width*this.fHR)-this.iCurrentWidth)*0.5;
                if ( this.iCurrentWidth <= 0){
                    this.iDirection = 1;
                }
            }
            else if ( this.iDirection == 1 ) //&& this.iCurrentWidth >= 10)
            {
                this.iCurrentWidth += kTimer.GetElapsedTime()*500;
                if ( this.iCurrentWidth > (this.width*this.fHR) )
                    this.iCurrentWidth = this.width*this.fHR;
                this.iCurrentX = (x*this.fHR) + ((this.width*this.fHR)-this.iCurrentWidth)*0.5 ;

            }
        }
        else if ( cardturntype == 3 )
        {
            if ( this.iDirection == 0)
            {
                this.iCurrentWidth -= kTimer.GetElapsedTime()*700;
                this.iCurrentX = (x*this.fHR) + ((this.width*this.fHR)-this.iCurrentWidth)*0.5;
                if ( this.iCurrentWidth <= 0){
                    this.iDirection = 1;
                }
            }
            else if ( this.iDirection == 1 )
            {
                this.iCurrentWidth += kTimer.GetElapsedTime()*500;
                if ( this.iCurrentWidth > (this.width*this.fHR) )
                    this.iCurrentWidth = this.width*this.fHR;

                this.iCurrentX = (x*this.fHR) + ((this.width*this.fHR)-this.iCurrentWidth)*0.5;
            }
        }
        else {
            if ( this.iDirection == 0)
            {
                this.iCurrentWidth -= kTimer.GetElapsedTime()*1000;
                this.iCurrentX = (x*this.fHR) + ((this.width*this.fHR)-this.iCurrentWidth)*0.5;
                if ( this.iCurrentWidth <= 0){
                    this.iDirection = 1;
                }
            }
            else if ( this.iDirection == 1 )
            {
                this.iCurrentWidth += kTimer.GetElapsedTime()*800;
                if ( this.iCurrentWidth > (this.width*this.fHR) )
                    this.iCurrentWidth = this.width*this.fHR;

                this.iCurrentX = (x*this.fHR) + ((this.width*this.fHR)-this.iCurrentWidth)*0.5;

            }
        }
        
        ctx.drawImage(
            this.sprite, 
            0, 
            0, 
            this.iSpriteWidth, 
            this.iSpriteHeight, 
            this.iCurrentX, 
            this.iCurrentY, 
            this.iCurrentWidth, 
            this.iCurrentHeight);
    } 
}