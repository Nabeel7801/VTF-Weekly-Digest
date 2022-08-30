
const currWeek = 4;
let modalOpen = false;

const weekData = [
    {
        week: 1, 
        title: 'CyberSecurity Foundations', 
        topics: ['MITRE attack', 'Breach & Attack Simulation', 'Red Canary Atomic Red', 'CYBERSECURITY FRAMEWORK', 'Professional Networking']
    },
    {
        week: 2, 
        title: 'Vulnerability management + SIEM/Log Management', 
        topics: ['SANS Vulnerability Management', 'Vulnerability-Assessment-Framework', 'Understanding Network Scanning usinng nmap', 'Splunk course', 'Qualys course', 'Professional Networking']
    },
    {
        week: 3, 
        title: 'OSINT', 
        topics: ['OSINT', 'Shodan', 'GooFuzz', 'Tryhackme rooms', "Don't Overcommit", 'Professional Networking']
    },
    {
        week: 4, 
        title: 'Network Security', 
        topics: ['Scappy', 'PFsense', 'Guacamole', 'Honeypots', 'Security Onion', 'Project Management', 'Professional Networking']
    },
    {
        week: 5, 
        title: 'Endpoint Security', 
        topics: ["Endpoint Security", "Windows,Linux", "OSSEC, Wazuh", "PsExec, Bloodhound", "Invoke-Obfuscation, CrackMapExec", "Sysmon", "Effective communication-written, Oral", "Professional Networking"]
    },
    {
        week: 6, 
        title: 'Vulnerability management + SIEM/Log Management', 
        topics: ["Web application security", "OWASP top10 (tryhackme room)", "BurpSuite", "Team conflict management", "Professional Networking"]
    },
    {
        week: 7, 
        title: 'Virtualization Fundamentals', 
        topics: ["Virtualization Fundamentals", "Network Security", "VMware HOL", "highlight your past accomplishments in the company to manager", "Professional Networking"]
    },
    {
        week: 8, 
        title: 'Container fundamentals', 
        topics: ["Container fundamentals", "Kubernetes", "How to join VTF", "Professional Networking"]
    },
    {
        week: 9, 
        title: 'Cloud Fundamentals', 
        topics: ["Cloud Fundamentals", "AWS Cloud", "mental and physical health", "Professional Networking"]
    },
    {
        week: 10, 
        title: 'CTF or Threat Hunting Lab', 
        topics: ["CTF or threat hunting lab", "and...", "<b>Oops! It's SECRET🤐</b>"]
    },
]

function showModal(week) {
    const {title, topics} = weekData.filter(data => data.week === week)[0];

    $("#weekModal .week-title").html(`Week ${week}: ${title}`);
    $("#weekModal .body ul").html("");
    topics.map(topic => $("#weekModal .body ul").append(`<li class="inside-text">${topic}</li>`));

    $("#weekModal").show();
    $("#weekModal .weekCard").css("margin-top", "-500px").animate({
        marginTop: "0"
    }, 500, () => modalOpen = true);
}

function closeModal() {
    
    $("#weekModal .weekCard").css("margin-top", "0").animate({
        marginTop: "500px"
    }, 200);

    $("#weekModal").fadeOut("fast");
    modalOpen = false;
    
}

$( document ).ready(function() {
    $("#weekModal").hide();
    // Populate All Weeks
    const section = weekData.map(data => `
        <div class="listItem${data.week < currWeek ? ' completed' : ''}">
            <span><strong>Week-${data.week}</strong></span>
            ${data.week < currWeek ?
                `<button type="button" class="btn iconBtn" onclick="showModal(${data.week})">
                    <i class="fas fa-eye"></i>
                </button>`
                :
                ""
            }
            <p>${data.title}</p>
        </div>
    `)
    $("#sessionSection").html(section);

    //Populate Current Week
    const {week, title, topics} = weekData.filter(data => data.week === currWeek)[0];
    $("#currWeekContent").html(`
        <h5 class="card-title">Week ${week}: ${title} </h5>
        <p class="card-text text-end me-4">
            <svg height="20" width="20" class="blinking">
                <circle cx="10" cy="8" r="5" fill="#3399FF" /> 
            </svg> <span style="text-transform: uppercase; font-size: 0.8em; font-weight: 600">current week</span>
        </p>
        <ul id="currWeekList">
        </ul>
    `)

    topics.map(topic => $("#currWeekList").append(`<li class="py-1">${topic}</li>`))

});

// Modal Mouse Click outside
$(document).mouseup(function(e) {
    const container = $("#weekModal .weekCard");
    if (modalOpen && (!container.is(e.target) && container.has(e.target).length === 0)) {
        closeModal();
    }
});