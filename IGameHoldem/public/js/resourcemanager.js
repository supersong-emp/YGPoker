 export default class IResourceManager{

    constructor()
    {
        this.listImages = [];
        this.iNumLoadCount = 0;
        this.bComplete = false;
        this.listLoads = [];
    }

    GetImage(cIndex)
    {
        console.log(`IResourceManager : GetImage (index:${cIndex})`);
        console.log(this.listImages[cIndex]);

        return this.listImages[cIndex];
    }

    RequestFile(strFilename, callback, listImages, listLoads)
    {     
        const urlfile = `http://localhost:5555/${strFilename}`;
        console.log(`##### ufl = ${urlfile}`);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", urlfile, true);
        xhr.responseType = "blob";
        xhr.send();
        xhr.onload = function() 
        {
            if (xhr.status === 200) 
            {
                var fileBlob = xhr.response;

                const reader = new FileReader();

                reader.readAsText(fileBlob);
                reader.onload = (event) => {
                    return callback(event.target.result, listImages, listLoads);
                }
            }
        };
    }

    ProcessResource(result, listImages, listLoads)
    {
        console.log(`ProcessResource ################################################`);
        const listLine = result.split('\r\n');
        for ( let i in listLine )
        {
            const index = listLine[i].indexOf('#');

            if ( index == -1 )
            {
                const temp = listLine[i].replace(/ /g, '');
                const listElement = temp.split(',');

                console.log(`listElement : ${listElement[0]}, ${listElement[1]}`);

                let image = new Image();
                image.onload = () => {

                    listLoads.push(0);
                }
                //image.src = 'img/game/bg01.png';
                image.src = listElement[0];

                let objectData = {image:image, strName:listElement[1]};
                listImages.push(objectData);
            }

            console.log(`listLine : ${i} : ${listLine[i]}, found index : ${index}`);
        }
        console.log(`#resources`);
        console.log(listImages);
    }

    LoadResource(strFilename, func, listImages, listLoads)
    {
        const result = this.RequestFile(strFilename, func, listImages, listLoads);
        console.log(`################################################ ${result}`);
        console.log(result);
    }

    Counter()
    {
        // ++ this.iNumLoadCount;

        // console.log(`### => IResourceManager : Counter ${this.iNumLoadCount}`);
    }
};