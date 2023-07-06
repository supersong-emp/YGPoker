 export default class IScreenConfig{

    constructor(x, y, default_width, default_height, width, height)
    {
        this.x = x;
        this.y = y;
        this.m_iDefaultWidth = default_width;
        this.m_iDefaultHeight = default_height;
        
        this.m_iCurrentWidth = width;
        this.m_iCurrentHeight = height;

        this.m_fWidthRate = 1;
        this.m_fHeightRate = 1;

        this.listDesktopLocationsH = [];
        this.listDesktopLocationsV = [];
        this.listMobileLocationH = [];
        this.listMobileLocationV = [];
        this.landscape = false;
        this.vertical = false;
        if(height > width)
        {
            this.vertical = true;
        }
        else
        {
            this.landscape = true;
        }
    }

    OnSize(width, height)
    {
        // if( width < 600 )
        // {
        //     this.m_iCurrentWidth = 600;
        //     this.m_iCurrentHeight = height;
        // }
        // else 
        // {
        //     this.m_iCurrentWidth = width;
        //     this.m_iCurrentHeight = height;
        // }
        this.m_iCurrentWidth = width;
        this.m_iCurrentHeight = height;
        
        this.m_fWidthRate = this.m_iCurrentWidth / this.m_iDefaultWidth;
        //this.m_fHeightRate = this.m_iCurrentWidth / this.m_iDefaultWidth;
        this.m_fHeightRate = this.m_iCurrentHeight / this.m_iDefaultHeight;

        if(height > width)
        {
            this.vertical = true;
            this.landscape = false;
        }
        else
        {
            this.landscape = true;
            this.vertical = false;
        }
    }

    IsMobile()
    {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    GetLocation(index)
    {
        if ( this.IsMobile() )
        {
            return this.listMobileLocationV[index];
        }
        else
        {
            //test
            //return this.listDesktopLocationsV[index];
            
            return this.listDesktopLocationsH[index];
        }
    }
};