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

    async RequestFile(strFilename, callback)
    {     
        const urlfile = `http://localhost:5555/${strFilename}`;
        console.log(`##### ufl = ${urlfile}`);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", urlfile, true);
        xhr.responseType = "blob";
        xhr.send();
        xhr.onload = async function() 
        {
            if (xhr.status === 200) 
            {
                var fileBlob = xhr.response;

                const reader = new FileReader();

                reader.readAsText(fileBlob);
                reader.onload = (event) => {
                    return callback(event.target.result);
                }
            }
        };
    }

    ProcessLocation(result)
    {
        console.log(`AAA ################################################ ${result}`);
        const listLine = result.split('\r\n');
        let eType = 'DesktopH';
        for ( let i in listLine )
        {
            console.log(`listLine : ${i}`);
            if ( listLine[i] == '#DesktopH' || listLine[i] == '#DesktopV' || listLine[i] == '#MobileH' || listLine[i] == '#MobileV' )
            {
                eType = listLine[i].replace(/#/g, '');

                console.log(eType);
            }
            else
            {
                const temp = listLine[i].replace(/ /g, '');
                const listElement = temp.split(',');
                //console.log(listElement);
                switch(eType)
                {
                case 'DesktopH':
                    console.log(`DesktopH : ${listElement[0]}, ${listElement[1]}, ${listElement[2]}`);
                    break;
                case 'DesktopV':
                    console.log(`DesktopV : ${listElement[0]}, ${listElement[1]}, ${listElement[2]}`);
                    break;
                case 'MobileH':
                    console.log(`MobileH : ${listElement[0]}, ${listElement[1]}, ${listElement[2]}`);
                    break;
                case 'MobileV':
                    console.log(`MobileV : ${listElement[0]}, ${listElement[1]}, ${listElement[2]}`);
                    break;                        
                }
            }
        }
    }

    async LoadLocation(strFilename, func)
    {
        const result = await this.RequestFile(strFilename, func);
        console.log(`################################################ ${result}`);
        console.log(result);
    }
};