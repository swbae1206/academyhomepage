function timestamp() {
	var today = new Date();
	today.setHours(today.getHours() + 9);
	return today.toISOString().replace('T', ' ').substring(0, 19);
}

verifyEmail = function (value) {
	var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	if (value.match(regExp) != null) {
		return true;
	}
	else {
		return false;
	}
};

function Counseling() {
	let name = document.getElementById("name");
	let phone = document.getElementById("phone");
	let email = document.getElementById("email");
	let agree = document.getElementById("counseling-agree");
	let date = timestamp();

	if (name.value.trim() === "") {
		alert("이름을 입력해주세요")
		return;
	}
	if (phone.value.trim() === "") {
		alert("휴대폰번호를 입력해주세요")
		return;
	}
	if (!agree.checked) {
		alert("개인정보 제공에 동의해 주세요.");
		return;
	}
	fetch("http://localhost:3500/counseling", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name.value,
			phone: phone.value,
			email: email.value,
			date: date
		}),
	})
		.then(function () {
			$('#enroll').modal('hide');
			alert("상담신청이 완료되었습니다.\n곧 담당자가 전화로 연락드릴 예정입니다.\n감사합니다");
		})
		.catch(() => alert("상담신청이 접수가 실패하였습니다."))
}

function Newsletter() {
	let email = document.getElementById("newsletter-email");
	let agree = document.getElementById("newsletter-agree");
	let date = timestamp();

	if (!agree.checked) {
		alert("개인정보 제공에 동의해 주세요.");
		return;
	}

	if (email.value.trim() === "") {
		alert("email을 입력하세요.");
		return;
	}
	if (!verifyEmail(email.value)) {
		alert("정확한 email을 입력하세요.");
		email.value = "";
		return;
	}
	fetch("http://localhost:3500/newsletter", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email.value,
			date: date
		}),
	})
		.then(function () {
			email.value = "";
			alert("Newsletter 받아보기가 등록되었습니다.");
		})
		.catch(() => alert("Newsletter 받아보기 등록이 실패했습니다."))
}

function Fee() {
	const query = "input[name='course-class']:checked";
	const selectedEls = document.querySelectorAll(query);
	let courses = "";
	selectedEls.forEach((el) => {
		courses += el.value + ", ";
	});

	console.log(courses);

	let name = document.getElementById("fee-name");
	let phone = document.getElementById("fee-phone");
	let agree = document.getElementById("fee-agree");
	let date = timestamp();
	if (name.value.trim() === "") {
		alert("이름을 입력하세요.");
		return;
	}
	if (phone.value.trim() === "") {
		alert("폰번호를 입력하세요.");
		return;
	}

	if (!agree.checked) {
		alert("개인정보 제공에 동의해 주세요.");
		return;
	}

	fetch("http://localhost:3500/fee", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name.value,
			phone: phone.value,
			courses: courses,
			date: date
		}),
	})
		.then(function () {
			alert("상담신청이 완료되었습니다.\n수강료와 강의시간에 대해, 곧 담당자가 전화로 상세히 설명드릴 예정입니다.");
			$("#feesearch").modal('hide');
		})
		.catch(function () {
			alert("수강료 및 강의시간 보기가 실패했습니다.")
		})
}
