#Implement all parts of this assignment within (this) module2_assignment2.rb file

#Implement a class called LineAnalyzer.
class LineAnalyzer
 


attr_reader :highest_wf_count, :highest_wf_words, :content, :line_number

def initialize(content, line_number)
  @content = content
  @line_number = line_number
  calculate_word_frequency
end


def calculate_word_frequency

counts = Hash.new 0

@content.downcase.tr(",.?!",'').split(' ').each{|word| counts[word] += 1}

@highest_wf_count = counts.values.max

@highest_wf_words = counts.select{|key , value| value == counts.values.max}.keys

end

end


#  Implement a class called Solution. 
class Solution

attr_reader :highest_count_across_lines, :highest_count_words_across_lines, :analyzers

 

def initialize
  @analyzers = []

end

def analyze_file
  @analyzers = []

  line_number=1
  File.foreach("test.txt") do |line|
    @analyzers.push(LineAnalyzer.new(line.chomp, line_number))
    line_number+=1
  end

end 





  def calculate_line_with_highest_frequency

@highest_count_across_lines = 0


@analyzers.each do |line|

if ( line.highest_wf_count > @highest_count_across_lines)

@highest_count_across_lines = line.highest_wf_count

end


end

@highest_count_words_across_lines = []

@analyzers.each do |line|

if (line.highest_wf_count == @highest_count_across_lines)

@highest_count_words_across_lines.push(line)

end

end

print_highest_word_frequency_across_lines

end


def print_highest_word_frequency_across_lines
  
  puts "The following words have highest frequency per line:"

  @highest_count_words_across_lines.each do |line_analyzer|
    puts "#{line_analyzer.highest_wf_words} (appears in line #{line_analyzer.line_number})" 
  end
end

end
