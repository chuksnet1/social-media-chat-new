import * as PostApi from '../api/postRequest'

export const getTimelinePost = (id)=> async(dispatch)=>{
    dispatch({type: "RETREIVING_START"})
    try {
        const {data} = await PostApi.getTimelinePosts(id);
        dispatch({type: "RETREIVING_SUCCESS", data: data})
    } catch (error) {
        dispatch({type: "RETREIVING_FAIL", error})
        console.log(error)
    }
}