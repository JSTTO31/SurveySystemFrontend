

export const errorMessage = (value: any) => {
    if(value.$errors.length > 0){
        return value.$errors[0].$message
    }

    return ""
}

export const dragToolsApi = () => {
    const pickUpTool = (e: any, tool: any) => {
        e.dataTransfer.setData("text", "qweqw");
    }

    const dropTool = (e: any) => {
        let text = e.dataTransfer.getData("text");
        console.log(text);
        console.log('example');
        
    }


    return {pickUpTool, dropTool}
}