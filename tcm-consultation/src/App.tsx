import { useState, useRef, useCallback, useEffect } from 'react';
import { DiagnosisData, DiagnosisResult } from './types';
import { analyzeSymptoms } from './diagnosis';
import { downloadReport } from './reportGenerator';

const COMMON_SYMPTOMS = [
  '头痛', '头晕', '失眠', '心悸', '胸闷', '咳嗽', '气短',
  '畏寒', '发热', '口干', '口苦', '咽痛', '脘腹胀满',
  '食欲不振', '恶心', '呕吐', '腹泻', '便秘', '尿频',
  '腰膝酸软', '疲劳乏力', '情绪抑郁', '焦虑不安',
  '潮热', '盗汗', '自汗', '肥胖', '消瘦', '水肿'
];

type DiagnosisStep = 'observation' | 'listening' | 'inquiry' | 'pulse' | null;

function App() {
  const [step, setStep] = useState<DiagnosisStep>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [tongueImage, setTongueImage] = useState<string | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [handImage, setHandImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState(30);
  const [patientGender, setPatientGender] = useState('男');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [pulseDescription, setPulseDescription] = useState('');

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
      alert('无法访问摄像头，请检查权限设置');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg', 0.8);
        setCurrentImage(imageData);
        return imageData;
      }
    }
    return null;
  }, []);

  const handleImageCapture = (type: 'tongue' | 'face' | 'hand') => {
    const image = captureImage();
    if (image) {
      if (type === 'tongue') setTongueImage(image);
      else if (type === 'face') setFaceImage(image);
      else if (type === 'hand') setHandImage(image);
    }
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleDiagnosis = async () => {
    if (!patientName || !chiefComplaint) {
      alert('请填写患者姓名和主诉');
      return;
    }

    setIsAnalyzing(true);

    const diagnosisData: DiagnosisData = {
      patientName,
      patientAge,
      patientGender,
      chiefComplaint,
      symptoms: selectedSymptoms,
      tongueImage,
      faceImage,
      handImage,
      pulseDescription,
      diagnosisTime: new Date().toISOString()
    };

    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = analyzeSymptoms(diagnosisData);
    setDiagnosisResult(result);
    setIsAnalyzing(false);
  };

  const handleExportReport = () => {
    if (diagnosisResult) {
      const diagnosisData: DiagnosisData = {
        patientName,
        patientAge,
        patientGender,
        chiefComplaint,
        symptoms: selectedSymptoms,
        tongueImage,
        faceImage,
        handImage,
        pulseDescription,
        diagnosisTime: new Date().toISOString()
      };
      downloadReport(diagnosisData, diagnosisResult);
    }
  };

  const handleReset = () => {
    setStep(null);
    setDiagnosisResult(null);
    setTongueImage(null);
    setFaceImage(null);
    setHandImage(null);
    setCurrentImage(null);
    setSelectedSymptoms([]);
    stopCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>🧭 中医问诊系统</h1>
        <p>望闻问切 · 智能诊断 · 科学调理</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <div className="panel">
            <h2 className="panel-title">📋 四诊信息采集</h2>

            <div className="four-diagnosis">
              <button
                className={`diagnosis-btn ${step === 'observation' ? 'active' : ''}`}
                onClick={() => setStep('observation')}
              >
                👁️ 望诊
              </button>
              <button
                className={`diagnosis-btn ${step === 'listening' ? 'active' : ''}`}
                onClick={() => setStep('listening')}
              >
                👂 闻诊
              </button>
              <button
                className={`diagnosis-btn ${step === 'inquiry' ? 'active' : ''}`}
                onClick={() => setStep('inquiry')}
              >
                ❓ 问诊
              </button>
              <button
                className={`diagnosis-btn ${step === 'pulse' ? 'active' : ''}`}
                onClick={() => setStep('pulse')}
              >
                💆 切诊
              </button>
            </div>

            {step === 'observation' && (
              <div className="camera-section">
                <h3 style={{ color: '#e94560', marginBottom: '15px' }}>望诊 - 观察舌象、面色、手部</h3>
                <div className="camera-container">
                  <video ref={videoRef} autoPlay playsInline muted />
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                  {currentImage && <img src={currentImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div className="camera-controls">
                  {!cameraActive && !currentImage && (
                    <button className="btn btn-primary" onClick={startCamera}>开启摄像头</button>
                  )}
                  {cameraActive && (
                    <>
                      <button className="btn btn-primary" onClick={captureImage}>拍照</button>
                      <button className="btn btn-secondary" onClick={() => handleImageCapture('tongue')}>舌象</button>
                      <button className="btn btn-secondary" onClick={() => handleImageCapture('face')}>面色</button>
                      <button className="btn btn-secondary" onClick={() => handleImageCapture('hand')}>手部</button>
                      <button className="btn btn-secondary" onClick={stopCamera}>关闭</button>
                    </>
                  )}
                  {currentImage && !cameraActive && (
                    <button className="btn btn-secondary" onClick={() => { setCurrentImage(null); startCamera(); }}>重新拍摄</button>
                  )}
                </div>
                {(tongueImage || faceImage || handImage) && (
                  <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {tongueImage && <img src={tongueImage} alt="Tongue" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />}
                    {faceImage && <img src={faceImage} alt="Face" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />}
                    {handImage && <img src={handImage} alt="Hand" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />}
                  </div>
                )}
              </div>
            )}

            {step === 'listening' && (
              <div className="camera-section">
                <h3 style={{ color: '#e94560', marginBottom: '15px' }}>闻诊 - 记录声音（可选）</h3>
                <p style={{ color: '#94a3b8', marginBottom: '15px' }}>可描述患者的声音状况：语音高低、呼吸情况等</p>
                <textarea
                  placeholder="例如：语音低沉、气短懒言、咳嗽声重..."
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  style={{ width: '100%', minHeight: '100px' }}
                />
              </div>
            )}

            {step === 'inquiry' && (
              <div className="questionnaire">
                <div className="question-group">
                  <label>基本信息</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="患者姓名"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="年龄"
                      value={patientAge}
                      onChange={(e) => setPatientAge(Number(e.target.value))}
                      style={{ width: '80px' }}
                    />
                    <select value={patientGender} onChange={(e) => setPatientGender(e.target.value)}>
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </div>
                </div>

                <div className="question-group">
                  <label>主诉（主要不适）</label>
                  <input
                    type="text"
                    placeholder="请描述患者主要不舒服的症状"
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                  />
                </div>

                <div className="question-group">
                  <label>症状选择（可多选）</label>
                  <div className="symptom-tags">
                    {COMMON_SYMPTOMS.map(symptom => (
                      <span
                        key={symptom}
                        className={`symptom-tag ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                        onClick={() => toggleSymptom(symptom)}
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 'pulse' && (
              <div className="camera-section">
                <h3 style={{ color: '#e94560', marginBottom: '15px' }}>切诊 - 脉象描述</h3>
                <p style={{ color: '#94a3b8', marginBottom: '15px' }}>
                  由于摄像头无法直接测量脉搏，请根据触摸脉搏的感觉选择或描述：
                </p>
                <div className="question-group">
                  <label>脉象类型（可多选）</label>
                  <div className="symptom-tags">
                    {['浮脉', '沉脉', '迟脉', '数脉', '滑脉', '涩脉', '弦脉', '细脉', '洪脉', '弱脉'].map(pulse => (
                      <span
                        key={pulse}
                        className={`symptom-tag ${pulseDescription.includes(pulse) ? 'selected' : ''}`}
                        onClick={() => setPulseDescription(prev => prev.includes(pulse) ? prev.replace(pulse, '').trim() : `${prev} ${pulse}`.trim())}
                      >
                        {pulse}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="question-group" style={{ marginTop: '15px' }}>
                  <label>其他脉象描述</label>
                  <textarea
                    placeholder="如：脉率不齐、脉力强弱等..."
                    value={pulseDescription}
                    onChange={(e) => setPulseDescription(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="right-panel">
          <div className="panel">
            <h2 className="panel-title">📊 诊断结果</h2>

            {!diagnosisResult && !isAnalyzing && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                <p>请完成四诊信息采集后，点击下方按钮进行诊断分析</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="loading">
                <div className="spinner" />
                <p>正在分析诊断...</p>
              </div>
            )}

            {diagnosisResult && !isAnalyzing && (
              <div className="diagnosis-result">
                <div className="diagnosis-item">
                  <h4>🔍 辨证结果</h4>
                  <p style={{ fontSize: '1.3rem', color: '#e94560', fontWeight: 'bold' }}>{diagnosisResult.syndrome}</p>
                </div>

                <div className="diagnosis-item">
                  <h4>📝 证候描述</h4>
                  <p>{diagnosisResult.syndromeDescription}</p>
                </div>

                <div className="diagnosis-item">
                  <h4>⚡ 病机分析</h4>
                  <p>{diagnosisResult.pathogenesis}</p>
                </div>

                <div className="diagnosis-item">
                  <h4>💊 治疗原则</h4>
                  <p>{diagnosisResult.treatment_principle}</p>
                </div>

                <div className="prescription">
                  <h4>📋 处方用药</h4>
                  <ul>
                    {diagnosisResult.prescription.map((med, index) => (
                      <li key={index}>
                        <span>{med.name}</span>
                        <span>{med.dosage}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="diagnosis-item" style={{ marginTop: '20px' }}>
                  <h4>🌿 生活调护建议</h4>
                  <ul style={{ paddingLeft: '20px' }}>
                    {diagnosisResult.lifestyleAdvice.map((advice, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{advice}</li>
                    ))}
                  </ul>
                </div>

                <div className="diagnosis-item">
                  <h4>📈 预后评估</h4>
                  <p>{diagnosisResult.prognosis}</p>
                </div>

                <div className="report-actions">
                  <button className="btn btn-primary" onClick={handleExportReport}>导出 PDF 报表</button>
                  <button className="btn btn-secondary" onClick={handleReset}>新建诊断</button>
                </div>
              </div>
            )}
          </div>

          {!diagnosisResult && !isAnalyzing && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={handleDiagnosis} style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
                开始智能诊断分析
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;