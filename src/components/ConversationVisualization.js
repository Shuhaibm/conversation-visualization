import React, { useState } from 'react';
import styled from 'styled-components';

// Function to truncate long text
const truncateText = (text, maxLength = 3000) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;

// Styled components
const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px;
  background-color: #f8fafc;
  min-height: 100vh;
  color: #334155;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
`;

const HeaderTitle = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin: 0;
`;

const HeaderSubtitle = styled.p`
  margin-top: 4px;
  opacity: 0.9;
  font-size: 14px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
`;

const CardHeader = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid #eaeaea;
  font-weight: bold;
  font-size: 16px;
`;

const CardBody = styled.div`
  padding: 12px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  height: 120px;
  font-size: 14px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s;
  font-size: 14px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #0ea5e9;
  color: white;

  &:hover:not(:disabled) {
    background-color: #0284c7;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #8b5cf6;
  color: white;

  &:hover {
    background-color: #7c3aed;
  }
`;

const TertiaryButton = styled(Button)`
  background-color: #64748b;
  color: white;

  &:hover {
    background-color: #475569;
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 3;
  min-width: 0; /* Prevents flex items from overflowing */
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  flex: 2;
  min-width: 0; /* Prevents flex items from overflowing */
`;

const ErrorMessage = styled.div`
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  border-left: 4px solid #ef4444;
`;

const Panel = styled.div`
  min-width: 300px;
  flex: 1;
`;

const PanelHeader = styled.div`
  padding: 10px 12px;
  font-weight: bold;
  font-size: 16px;
  background-color: #334155;
  color: white;
`;

const UserPromptHeader = styled(PanelHeader)`
  background-color: #0369a1;
`;

const EvalHeader = styled(PanelHeader)`
  background-color: #7e22ce;
`;

const SectionHeader = styled.div`
  padding: 8px 12px;
  font-weight: 600;
  font-size: 15px;
  background-color: #f1f5f9;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0;
`;

const MessageContainer = styled.div`
  ${props => props.isUser ? `
    margin: 8px 8px 16px auto;
    background: linear-gradient(135deg, #0ea5e9, #38bdf8);
    color: white;
    border-radius: 16px 16px 0 16px;
  ` : `
    margin: 8px auto 16px 8px;
    background-color: #f1f5f9;
    color: #334155;
    border-radius: 16px 16px 16px 0;
    border: 1px solid #e2e8f0;
  `}
  padding: 14px;
  max-width: 80%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ConversationContainer = styled.div`
  background-color: #f8fafc;
  padding: 6px;
  max-height: 500px;
  min-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  border-top: 1px solid #e2e8f0;
`;

const MessageSender = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

const MessageContent = styled.div`
  white-space: pre-wrap;
`;

const AlignmentBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 9999px;
  font-weight: 500;
  color: white;
  background-color: ${props => props.isAligned ? '#10b981' : '#ef4444'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const RewardBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 9999px;
  font-weight: 500;
  color: white;
  background-color: ${props => props.value === 1.0 ? '#10b981' : '#ef4444'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const EvalContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
`;

const EvalTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 5px;
  color: #1f2937;
`;

const EvalText = styled.div`
  font-size: 13px;
  padding: 10px;
  background-color: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  line-height: 1.4;
  max-height: 300px;
  overflow-y: auto;
`;

const EmptyState = styled(Card)`
  text-align: center;
  padding: 32px;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  color: #9ca3af;
  margin-bottom: 16px;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 48px;
  color: #6b7280;
  font-size: 14px;
`;

export const ConversationVisualization = () => {
  const [data, setData] = useState(null);
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle JSON input
  const handleJsonSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const parsedData = JSON.parse(jsonInput);
        
        // Validate the structure of the input data
        if (!parsedData.conversation || !Array.isArray(parsedData.conversation)) {
          throw new Error('JSON must include a "conversation" array');
        }
        
        if (!parsedData.user_prompt) {
          throw new Error('JSON must include a "user_prompt" field');
        }
        
        if (!parsedData.eval_results) {
          throw new Error('JSON must include an "eval_results" object');
        }
        
        setData(parsedData);
        setError('');
      } catch (err) {
        setError(`Invalid JSON format: ${err.message}`);
      }
      setIsLoading(false);
    }, 300); // Small timeout for loading animation
  };

  // Parse JSON from sample button
  const loadSampleData = () => {
    const sampleJson = `{
      "user_prompt": "You are mia_li_3668. You want to fly from New York to Seattle on May 20 (one way)...",
      "conversation": [
        {"role": "user", "content": "I'm looking to book a flight."},
        {"role": "assistant", "content": "To assist you with booking a flight, I'll need your user ID. Could you please provide that?"},
        {"role": "user", "content": "I'm mia_li_3668."}
      ],
      "eval_results": {
        "user_behavior_summary": "The user simulator provided their ID and flight details...",
        "alignment_score": true,
        "justification": "The user simulator followed the prompt instructions...",
        "tau_bench_static_reward": 1.0,
        "conversation_summary": "The system asked for verification and the user provided it.",
        "user_misalignment": "No misalignment detected in user behavior."
      }
    }`;
    
    setJsonInput(sampleJson);
  };

  // Function to clear the form
  const clearForm = () => {
    setJsonInput('');
    setData(null);
    setError('');
  };

  // Function to render conversation messages
  const renderConversation = (conversation) => {
    return conversation.map((message, index) => {
      const isUser = message.role === 'user';
      return (
        <MessageContainer key={index} isUser={isUser}>
          <MessageSender isUser={isUser}>
            {isUser ? 'User' : 'Assistant'}
          </MessageSender>
          <MessageContent>{message.content}</MessageContent>
        </MessageContainer>
      );
    });
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Conversation Data Visualization</HeaderTitle>
        <HeaderSubtitle>Analyze AI conversation evaluations with an interactive visualization</HeaderSubtitle>
      </Header>
      
      {/* JSON Input Card */}
      <Card>
        <CardHeader>Input Data</CardHeader>
        <CardBody>
          <form onSubmit={handleJsonSubmit}>
            <InputLabel htmlFor="jsonInput">
              JSON Data:
            </InputLabel>
            <TextArea
              id="jsonInput"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON data here..."
            />
            
            {error && (
              <ErrorMessage>
                <p style={{fontWeight: '500'}}>Error</p>
                <p>{error}</p>
              </ErrorMessage>
            )}
            
            <div style={{marginTop: '16px'}}>
              <PrimaryButton
                type="submit"
                disabled={isLoading || !jsonInput.trim()}
              >
                {isLoading ? 'Processing...' : 'Visualize Data'}
              </PrimaryButton>
              
              <SecondaryButton
                type="button"
                onClick={loadSampleData}
              >
                Load Sample
              </SecondaryButton>
              
              <TertiaryButton
                type="button"
                onClick={clearForm}
              >
                Clear
              </TertiaryButton>
            </div>
          </form>
        </CardBody>
      </Card>
      
      {/* Main Visualization */}
      {data ? (
        <FlexRow>
          {/* Left Panel - User Prompt & Conversation */}
          <LeftPanel>
            <FlexCol>
              {/* User Prompt */}
              <Card>
                <UserPromptHeader>User Prompt</UserPromptHeader>
                <CardBody style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  <MessageContent>{truncateText(data.user_prompt, 2000)}</MessageContent>
                </CardBody>
              </Card>
              
              {/* Conversation Log */}
              <Card style={{ flex: 1 }}>
                <PanelHeader>Conversation Log</PanelHeader>
                <ConversationContainer>
                  {renderConversation(data.conversation)}
                </ConversationContainer>
              </Card>
            </FlexCol>
          </LeftPanel>
          
          {/* Right Panel - Evaluation */}
          <RightPanel>
            {/* Evaluation Results */}
            <Card>
              <EvalHeader>Evaluation</EvalHeader>
              
              {data.eval_results && (
                <>
                  {/* Tau-Bench Task Completion Reward */}
                  <EvalContainer>
                    <SectionHeader>Tau-Bench Task Completion Reward</SectionHeader>
                    <div style={{display: 'flex', alignItems: 'center', padding: '10px'}}>
                      <RewardBadge value={data.eval_results.tau_bench_static_reward || 0.0}>
                        {data.eval_results.tau_bench_static_reward === 1.0 ? 'Pass ✓' : 'Fail ✗'} 
                        ({data.eval_results.tau_bench_static_reward?.toFixed(1) || '0.0'})
                      </RewardBadge>
                    </div>
                  </EvalContainer>
                  
                  {/* LLM Judge Section - Only shown if relevant data exists */}
                  {(data.eval_results.alignment_score !== undefined || 
                    data.eval_results.conversation_summary || 
                    data.eval_results.user_misalignment || 
                    data.eval_results.user_behavior_summary) && (
                    <>
                      <SectionHeader>LLM Judge (optional)</SectionHeader>
                      
                      {/* System Evaluation */}
                      {(data.eval_results.alignment_score !== undefined || 
                        data.eval_results.conversation_summary) && (
                        <EvalContainer>
                          <EvalTitle>System Evaluation:</EvalTitle>
                          {data.eval_results.alignment_score !== undefined && (
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '8px', marginBottom: '8px'}}>
                              <div style={{fontSize: '14px', marginRight: '12px'}}>Alignment:</div>
                              <AlignmentBadge isAligned={data.eval_results.alignment_score}>
                                {data.eval_results.alignment_score ? 'Aligned ✓' : 'Not Aligned ✗'}
                              </AlignmentBadge>
                            </div>
                          )}
                          {data.eval_results.conversation_summary && (
                            <EvalText>
                              {data.eval_results.conversation_summary}
                            </EvalText>
                          )}
                        </EvalContainer>
                      )}
                      
                      {/* User Evaluation */}
                      {(data.eval_results.user_misalignment || 
                        data.eval_results.user_behavior_summary) && (
                        <EvalContainer>
                          <EvalTitle>User Evaluation:</EvalTitle>
                          <EvalText>
                            {data.eval_results.user_misalignment || data.eval_results.user_behavior_summary}
                          </EvalText>
                        </EvalContainer>
                      )}
                    </>
                  )}
                </>
              )}
            </Card>
          </RightPanel>
        </FlexRow>
      ) : (
        <EmptyState>
          <EmptyStateIcon>?</EmptyStateIcon>
          <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}}>No Data Visualized Yet</h2>
          <p style={{marginBottom: '16px', color: '#4b5563'}}>Paste your JSON data in the input field above and click "Visualize Data" to get started.</p>
          <p style={{color: '#4b5563'}}>You can also click the "Load Sample" button to try the visualization with example data.</p>
        </EmptyState>
      )}
      
      <Footer>
        <p>Conversation Data Visualization Tool © 2025</p>
      </Footer>
    </Container>
  );
};

export default ConversationVisualization;