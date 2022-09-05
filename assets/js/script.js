
const currWeek = 4;
let modalOpen = false;

const weekData = [
    {
        week: 1, 
        title: 'CyberSecurity Foundations', 
        topics: ['MITRE attack', 'Breach & Attack Simulation', 'Red Canary Atomic Red', 'CYBERSECURITY FRAMEWORK', 'Professional Networking'],
        data: [
            {
                title: "Technology",
                options: [
                    {
                        title: "Topics",
                        html: `
                            <li class="inside-text">
                                <p>MITRE ATTACK - <a href="https://attack.mitre.org/">https://attack.mitre.org/</a></p>
                            </li>
                            <li class="inside-text">
                                <p>Defend - <a href="https://d3fend.mitre.org/about/">https://d3fend.mitre.org/about/</a></p>
                            </li>
                            <li class="inside-text">
                                <p>Navigator - <a href="https://atlas.mitre.org/navigator/">https://atlas.mitre.org/navigator/</a></p>
                            </li>
                            <li class="inside-text">
                                <p>Breach & Attack Simulation</p>
                            </li>
                            <li class="inside-text">
                                <p>Threat Informed Defense 101</p>
                            </li>
                            <li class="inside-text">
                                <p>CYBERSECURITY FRAMEWORK : <a href="https://www.nist.gov/cyberframework">https://www.nist.gov/cyberframework</a></p>
                            </li>
                        `
                    },
                    {
                        title: "Exercises",
                        html: `<h4>Exercises - Content to be added</h4>`
                    }
                ]
            },
            {
                title: "Business Etiquette",
                options: [
                    {
                        title: "Topics",
                        html: `<h4>Topics - Content to be added</h4>`
                    },
                    {
                        title: "Exercises",
                        html: `<h4>Exercises - Content to be added</h4>`
                    }
                ]
            },
            {
                title: "Network Visibility",
                html: `<h4>Network Visibility - to be added</h4>`
            }
        ]
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

function changeBodyHtml(data) {
    $("#weekModal #weeklyCardData").html(data);

}

function showModal(week) {
    const {title, topics, data} = weekData.filter(data => data.week === week)[0];

    $("#weekModal .week-title").html(`Week ${week}: ${title}`);

    $("#weekModal #weeklyCardSidebar").html("");
    data.map((item, key) => $("#weekModal #weeklyCardSidebar").append(

        item.options ? 
            `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-heading${key}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${key}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            ${item.title}
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse${key}" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-heading${key}">
                        <div class="accordion-body">
                            ${item.options.map((option, index) => 
                                index === item.options.length - 1 ?
                                    "<button class='inner-button last' onclick='changeBodyHtml(" + JSON.stringify(option.html) + ")'>" + option.title + "</button>"
                                :
                                    "<button class='inner-button' onclick='changeBodyHtml(" + JSON.stringify(option.html) + ")'>" + option.title + "</button>"
                            ).join("")}
                        </div>
                    </div>
                </div>
            `
        :
            `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-single-button" type="button" onclick='changeBodyHtml(${JSON.stringify(item.html)})'>
                            ${item.title}
                        </button>
                    </h2>
                </div>
            `

    ))

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
                `<button type="button" class="btn btn-primary btn-sm" onclick="showModal(${data.week})">
                    Show
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