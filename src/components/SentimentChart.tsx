import { SentimentLevel } from '@/types/chat';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { format } from 'date-fns';

interface SentimentChartProps {
  history: { timestamp: Date; level: SentimentLevel }[];
}

const sentimentToValue: Record<SentimentLevel, number> = {
  positive: 5,
  neutral: 4,
  warning: 3,
  negative: 2,
  escalated: 1,
};

const valueToSentiment: Record<number, { label: string; emoji: string }> = {
  5: { label: 'Positive', emoji: '😊' },
  4: { label: 'Neutral', emoji: '😐' },
  3: { label: 'Warning', emoji: '😟' },
  2: { label: 'Negative', emoji: '😠' },
  1: { label: 'Escalated', emoji: '🚨' },
};

export function SentimentChart({ history }: SentimentChartProps) {
  const data = history.map((item, index) => ({
    time: format(item.timestamp, 'HH:mm'),
    value: sentimentToValue[item.level],
    level: item.level,
    index,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const info = valueToSentiment[value];
      return (
        <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
          <p className="text-sm font-medium text-foreground">
            {info?.emoji} {info?.label}
          </p>
          <p className="text-xs text-muted-foreground">
            {payload[0].payload.time}
          </p>
        </div>
      );
    }
    return null;
  };

  const getGradientColor = () => {
    const lastValue = data[data.length - 1]?.value || 4;
    if (lastValue >= 4) return { start: 'hsl(158, 50%, 45%)', end: 'hsl(158, 50%, 45%)' };
    if (lastValue === 3) return { start: 'hsl(38, 90%, 55%)', end: 'hsl(38, 90%, 55%)' };
    return { start: 'hsl(0, 70%, 60%)', end: 'hsl(0, 70%, 60%)' };
  };

  const colors = getGradientColor();

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Sentiment Journey</h3>
        <div className="flex items-center gap-1">
          {[5, 4, 3, 2, 1].map((val) => (
            <span key={val} className="text-xs" title={valueToSentiment[val].label}>
              {valueToSentiment[val].emoji}
            </span>
          ))}
        </div>
      </div>
      
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.start} stopOpacity={0.4} />
                <stop offset="95%" stopColor={colors.end} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={3} stroke="hsl(var(--border))" strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.start}
              strokeWidth={2}
              fill="url(#sentimentGradient)"
              dot={{ fill: colors.start, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: colors.start }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <span>Start</span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-border" />
          <span>Threshold</span>
        </span>
        <span>Now</span>
      </div>
    </div>
  );
}
