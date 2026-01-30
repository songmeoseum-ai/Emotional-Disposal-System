// Minimal, explicit, no storage, no history.
(function () {
  const app = document.getElementById('app');
  const input = document.getElementById('input');
  const processingEl = document.getElementById('processing');
  const ephemeralMsg = document.getElementById('ephemeralMsg');
  const ephemeralText = document.querySelector('.ephemeral-text');
  const buttons = Array.from(document.querySelectorAll('.btn'));

  // Random messages
  const messages = [
    '기분은 휘발성입니다.',
    '기분은 저장하지 않습니다.',
    '모든 감정은 자동 삭제됩니다.',
    '이 시스템은 아무것도 기억하지 않습니다.',
    '입력된 내용은 남지 않습니다.',
    '감정은 처리 후 폐기됩니다.',
    '기록은 존재하지 않습니다.',
    '흔적은 남지 않습니다.',
    '아무것도 보관하지 않습니다.',
    '복구는 지원하지 않습니다.',
    '저장 기능은 제공되지 않습니다.',
    '의미는 보존되지 않습니다.',
    '당신의 감정은 데이터가 아닙니다.',
    '이곳에는 기록이 없습니다.',
    '남기는 행위는 지원되지 않습니다.',
    '모든 입력은 소멸합니다.',
    '감정은 머물지 않습니다.',
    '모든 것은 잠시 존재합니다.',
    '여기에 남는 것은 없습니다.',
    '지나간 것은 돌아오지 않습니다.',
    '사라지는 것이 기본값입니다.',
    '존재는 일시적입니다.',
    '방금의 감정은 이미 과거입니다.',
    '기록되지 않은 것만 남습니다.',
    'No data retained.',
    'Memory cleared.',
    'Temporary session only.',
    'Auto purge enabled.',
    'Disposal complete.',
    'Nothing to recover.',
    'Session expired.',
    'Buffer flushed.'
  ];

  function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Attach same handler to all action buttons
  buttons.forEach(btn => btn.addEventListener('click', handleAction));

  function setProcessing(state) {
    if (state) {
      app.classList.add('processing-mode');
      processingEl.setAttribute('aria-hidden', 'false');
    } else {
      app.classList.remove('processing-mode');
      processingEl.setAttribute('aria-hidden', 'true');
    }
  }

  function setEphemeralMode(state) {
    if (state) {
      app.classList.add('ephemeral-mode');
      ephemeralMsg.setAttribute('aria-hidden', 'false');
    } else {
      app.classList.remove('ephemeral-mode');
      ephemeralMsg.setAttribute('aria-hidden', 'true');
    }
  }

  function disableControls(flag) {
    input.disabled = flag;
    buttons.forEach(b => b.disabled = flag);
  }

  function handleAction(e) {
    const action = e.target.dataset.action;
    disableControls(true);

    if (action === 'trash') {
      // Trash: Processing → 마지막 문구
      setProcessing(true);
      const processingDuration = 1000; // 1초

      setTimeout(() => {
        setProcessing(false);
        input.value = '';
        handleTrash();
      }, processingDuration);
    } else if (action === 'shred') {
      // Shred: 효과 → Processing → 마지막 문구
      handleShred();
    } else if (action === 'launch') {
      // Launch: 효과 → Processing → 마지막 문구
      handleLaunch();
    }
  }

  function handleTrash() {
    // Quietly clear and show ephemeral message immediately
    ephemeralText.textContent = getRandomMessage();
    setEphemeralMode(true);

    const ephemeralDuration = 1000 + Math.floor(Math.random() * 1000); // 1~2초

    setTimeout(() => {
      setEphemeralMode(false);
      disableControls(false);
    }, ephemeralDuration);
  }

  function handleShred() {
    // Start shred animation immediately
    input.classList.add('shred-anim');
    app.classList.add('shred-glitch');

    const shredDuration = 800; // 0.8초 애니메이션
    const glitchDuration = 200; // 0.2초 글리치
    const totalEffectDuration = shredDuration + glitchDuration;

    setTimeout(() => {
      input.value = '';
      input.classList.remove('shred-anim');
      // 바로 input 숨기고 Processing 표시
      input.style.opacity = '0';
      input.style.pointerEvents = 'none';
      setProcessing(true);
    }, shredDuration);

    // After glitch completes
    setTimeout(() => {
      app.classList.remove('shred-glitch');

      const processingDuration = 1000 + Math.floor(Math.random() * 1000); // 1~2초

      setTimeout(() => {
        setProcessing(false);
        
        // Show ephemeral message
        ephemeralText.textContent = getRandomMessage();
        setEphemeralMode(true);

        const ephemeralDuration = 1000 + Math.floor(Math.random() * 1000); // 1~2초

        setTimeout(() => {
          setEphemeralMode(false);
          // Restore input for next use
          input.style.opacity = '1';
          input.style.pointerEvents = 'auto';
          disableControls(false);
        }, ephemeralDuration);
      }, processingDuration);
    }, totalEffectDuration);
  }

  function handleLaunch() {
    // Start float animation immediately
    input.classList.add('launch-anim');

    const launchDuration = 2000; // 2초 애니메이션

    setTimeout(() => {
      input.value = '';
      input.classList.remove('launch-anim');
      // 바로 input 숨기고 Processing 표시
      input.style.opacity = '0';
      input.style.pointerEvents = 'none';
      setProcessing(true);

      const processingDuration = 1000 + Math.floor(Math.random() * 1000); // 1~2초

      setTimeout(() => {
        setProcessing(false);

        // Show ephemeral message
        ephemeralText.textContent = getRandomMessage();
        setEphemeralMode(true);

        const ephemeralDuration = 1000 + Math.floor(Math.random() * 1000); // 1~2초

        setTimeout(() => {
          setEphemeralMode(false);
          // Restore input for next use
          input.style.opacity = '1';
          input.style.pointerEvents = 'auto';
          disableControls(false);
        }, ephemeralDuration);
      }, processingDuration);
    }, launchDuration);
  }
})();