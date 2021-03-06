import React, { useState, useEffect } from 'react'
import moment from 'moment';
import axios, { HOST } from '../../../utils/httpUtilities';
import LocalStorageService from './../../../utils/localStorage';
import './Resume.css';
function RenderResume(props) {
    let BASE_URL = HOST;

    let resumeId = props.location.resumeId

    const [resume, setResume] = useState();
    const [basicInfo, setBasicInfo] = useState();

    useEffect(() => {
        getResume();
        getBasicInfo();
    }, [])

    useEffect(() => {
        console.log(JSON.stringify(resume));
    }, [resume])

    const getBasicInfo = () => {
        let userId = LocalStorageService.getUserInfo().userId;
        axios.get(`${HOST}/basicinfo/list/${userId}`)
            .then(function (response) {
                setBasicInfo(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getResume = () => {
        axios.get(`${BASE_URL}/resume/${resumeId}`).then((response) => {
            setResume(response.data.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    if (resume && basicInfo) {
        let info = basicInfo[0];

        return (
            <div>
                <div className='basic_info'>
                    <h1 className='cap'>{info.firstName} {info.lastName}</h1>
                    <h6 className='cap'>{info.email} {info.phone}</h6>
                    <h6 className='cap'>{info.address}, {info.region} {info.country}</h6>
                    <h6 ><a href={`http://${info.gitHub}`} target="_blank" rel="noopener noreferrer"> {info.gitHub} </a>  |<a href={`http://${info.linkedin}`} target="_blank" rel="noopener noreferrer"> {info.linkedin} </a></h6>
                    <h6></h6>
                </div>
                <hr />

                {(resume.profile.profile !== '') ? <h6>Profile</h6> : ''}
                <div className='profile'>
                    <div>{resume.profile.profile}</div>
                </div>
                {(resume.profile.profile !== '') ? <hr /> : ''}

                {(resume.objective.objective !== '') ? <h6>Objective</h6> : ''}
                <div className='objective'>
                    <div>{resume.objective.objective}</div>
                </div>
                {(resume.objective.objective !== '') ? <hr /> : ''}

                {(resume.experience.length > 0) ? <h6>Experience</h6> : ''}
                {resume.experience.map((edu) => {
                    return (
                        <div key={edu._id} className='experience'>
                            <strong>{edu.title} ({edu.type}),  {edu.company} {moment(edu.start_date).format("LL")} - {moment(edu.end_date).format("LL")}</strong>
                            <div>{edu.description}</div>
                        </div>
                    )
                })}
                {(resume.experience.length > 0) ? <hr /> : ''}

                {(resume.projects.length > 0) ? <h6>Projects</h6> : ''}
                {resume.projects.map((edu) => {
                    return (
                        <div key={edu._id} className='projects'>
                            <strong>{edu.name}</strong>
                            <div>{edu.description}</div>
                        </div>
                    )
                })}
                {(resume.projects.length > 0) ? <hr /> : ''}


                {(resume.education.length > 0) ? <h6>Education</h6> : ''}
                {resume.education.map((edu) => {
                    return (
                        <div key={edu._id} className='education'>
                            <strong>{edu.school}, {edu.start} - {edu.finish}</strong>
                            <div>{edu.degree}</div>
                            <div>{edu.field}</div>
                        </div>
                    )
                })}
                {(resume.education.length > 0) ? <hr /> : ''}


                {(resume.skills.filter(skill => skill.is_hard_skill).length > 0) ? <h6>Hard Skills</h6> : ''}
                <div className='skills'>
                    {resume.skills.filter(skill => (skill.is_hard_skill)).map(skill => skill.skill_name).join(', ')}
                </div>
                {(resume.skills.filter(skill => skill.is_hard_skill).length > 0) ? <hr /> : ''}


                {(resume.skills.filter(skill => !skill.is_hard_skill).length > 0) ? <h6>Soft Skills</h6> : ''}
                <div className='skills'>
                    {resume.skills.filter(skill => (!skill.is_hard_skill)).map(skill => skill.skill_name).join(', ')}
                </div>
                {(resume.skills.filter(skill => !skill.is_hard_skill).length > 0) ? <hr /> : ''}

                {(resume.languages.length > 0) ? <h6>Languages</h6> : ''}
                <div className='languages'>
                    {resume.languages.map(lang => `${lang.language} : ${lang.proficiency}`).join(', ')}
                </div>
                {(resume.languages.length > 0) ? <hr /> : ''}

            </div >
        )
    } else {
        return (
            <div>
                <h3>Loading</h3>
            </div>
        )
    }

}

export default RenderResume
